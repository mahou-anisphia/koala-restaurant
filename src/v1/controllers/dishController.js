const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Dish = require("../service/dishServices");
const Category = require("../service/categoryServices");
const S3UploadUtils = require("../../utils/s3BucketUtils");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class DishController {
  // Function to add a new dish to the database

  static async addDish(req, res) {
    try {
      upload.single("image")(req, res, async (err) => {
        const {
          name: Name,
          description: Description,
          price: Price,
          preparationTime: PreparationTime,
          categoryID: CategoryID,
        } = req.body;
        const userID = req.user.UserID;

        try {
          // Check if required fields are present
          if (
            !Name ||
            !Description ||
            !Price ||
            !PreparationTime ||
            !CategoryID
          ) {
            return res.status(400).json({ message: "Dish Missing Field!" });
          }

          // Handle file upload

          if (err) {
            return res.status(400).json({ message: "Error uploading file" });
          }

          if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
          }

          try {
            // Validate category
            const validateCategory = await Category.getCategoryByID(CategoryID);
            if (!validateCategory) {
              return res
                .status(400)
                .json({ message: "Category Does Not Exist" });
            }

            // Generate unique image key
            const imageKey = `${uuidv4()}-${req.file.originalname}`;

            // Upload image to S3
            const imageLink = await S3UploadUtils.uploadImageToS3(
              req.file,
              imageKey
            );

            // Prepare data to save in database
            const productData = {
              Name,
              Description,
              Price,
              PreparationTime,
              ImageLink: imageLink,
              CategoryID,
              CreatedBy: userID,
              ModifiedBy: userID,
            };

            // Save dish data in database
            const dish = await Dish.addDish(productData);

            return res
              .status(201)
              .json({ message: "Dish uploaded successfully", dishID: dish });
          } catch (error) {
            console.error("Error while adding dish:", error);
            return res.status(500).json({ message: "Internal server error" });
          }
        } catch (error) {
          console.error("Error in addDish:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      });
    } catch (error) {
      console.error("Error in deconstruct multipart form:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Function to update an existing dish in the database
  static async updateDish(req, res) {
    try {
      const userID = req.user.UserID;
      const dishId = req.params.id;
      const dish = await Dish.getDishByID(dishId);

      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      upload.single("image")(req, res, async (err) => {
        if (err) {
          console.error("Error logging in:", err);
          return res.status(500).json({ message: "Image upload failed" });
        }

        try {
          dish.DishName = req.body.Name || dish.DishName;
          dish.Description = req.body.Description || dish.Description;
          dish.Price = req.body.Price || dish.Price;
          dish.ModifiedBy = userID;
          dish.PreparationTime =
            req.body.PreparationTime || dish.PreparationTime;
          if (req.body.CategoryID) {
            const validateCategory = await Category.getCategoryByID(
              req.body.CategoryID
            );
            if (!validateCategory) {
              return res
                .status(400)
                .json({ message: "Category Does Not Exist" });
            }
            dish.CategoryID = req.body.CategoryID;
          }
          if (!req.file) {
            const validate = await Dish.updateDish(dishId);
            if (validate) {
              return res.status(200).json({
                message: "Dish updated successfully",
                result: validate,
              });
            } else {
              return res.status(500).json({ message: "Dish update failed" });
            }
          } else {
            const imageKey = `${uuidv4()}-${req.file.originalname}`;
            const imageLink = await S3UploadUtils.uploadImageToS3(
              req.file,
              imageKey
            );

            const s3URL = dish.ImageLink;
            const match = s3URL.match(/https:\/\/.*\.s3\.amazonaws\.com\/(.*)/);
            if (!match || !match[1]) {
              return res.status(400).json({ message: "Invalid S3 URL" });
            }

            dish.ImageLink = imageLink;
            const validate = await Dish.updateDish(dishId);
            if (validate) {
              await S3UploadUtils.deleteObjectFromS3(match[1]);
              return res.status(200).json({
                message: "Dish updated successfully",
                result: validate,
              });
            } else {
              return res.status(500).json({ message: "Dish update failed" });
            }
          }
        } catch (updateErr) {
          console.error("Error updateDish:", updateErr);
          return res.status(500).json({ message: "Dish update failed" });
        }
      });
    } catch (err) {
      console.error("Error update dish:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Function to delete a dish from the database
  static async deleteDish(req, res) {
    try {
      const dishId = req.params.id;
      if (!dishId) {
        return res.status(400).json({ message: "Dish ID is required" });
      }

      const dish = await Dish.getDishByID(dishId);
      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      const s3URL = dish.ImageLink;
      const match = s3URL.match(/https:\/\/.*\.s3\.amazonaws\.com\/(.*)/);
      if (!match || !match[1]) {
        return res.status(400).json({ message: "Invalid S3 URL" });
      }

      const key = match[1];
      await S3UploadUtils.deleteObjectFromS3(key);

      const validate = await Dish.deleteDish(dishId);
      if (validate) {
        return res.status(200).json({ message: "Dish deleted successfully" });
      } else {
        return res.status(500).json({ message: "Failed to delete dish" });
      }
    } catch (error) {
      console.error("Error in delete dish", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Function to get details of a specific dish from the database
  static async getDishByID(req, res) {
    try {
      const dishId = req.params.id;
      if (!dishId) {
        return res.status(400).json({ message: "Dish ID is required" });
      }

      const dish = await Dish.getDishByID(dishId);
      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      return res.status(200).json(dish);
    } catch (error) {
      console.error("Error in getDishByID:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Function to get all dishes from the database
  static async getAllDishes(req, res) {
    try {
      const dishes = await Dish.getAllDishes();
      return res.status(200).json(dishes);
    } catch (error) {
      console.error("Error in getAllDishes:", error);
      return res.status(500).json({ message: "Failed to fetch dishes" });
    }
  }
  static async SearchDishes(req, res) {
    const term = req.params.searchQueries;
    try {
      const result = await Dish.SearchDishes(term);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error Search Occured", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getDishesByCategoryID(req, res) {
    try {
      const categoryID = req.params.id;
      if (!categoryID) {
        return res.status(400).json({ message: "Category ID is required" });
      }

      const dishes = await Dish.getDishesByCategoryID(categoryID);
      if (!dishes || dishes.length === 0) {
        return res
          .status(404)
          .json({ message: "No dishes found for the given category ID" });
      }

      return res.status(200).json(dishes);
    } catch (error) {
      console.error("Error in getDishesByCategoryID:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = DishController;
