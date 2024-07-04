const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Dish = require("../service/dishServices");
const S3UploadUtils = require("../../utils/s3BucketUtils");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class DishController {
  // Function to add a new dish to the database

  static async addDish(req, res) {
    const userID = req.user.userID;

    try {
      // Handle file upload
      upload.single("image")(req, res, async (err) => {
        // Check if required fields are present
        if (
          !req.body.Name ||
          !req.body.Description ||
          !req.body.Price ||
          !req.body.PreparationTime
        ) {
          console.log(req);
          return res.status(400).json({ message: "Dish Missing Field!" });
        }
        if (err) {
          return res.status(400).json({ message: "Error uploading file" });
        }

        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        const imageKey = `${uuidv4()}-${req.file.originalname}`;

        // Upload image to S3
        const imageLink = await S3UploadUtils.uploadImageToS3(
          req.file,
          imageKey
        );
        console.log(imageLink);
        // Prepare data to save in database
        const productData = {
          Name: req.body.Name,
          Description: req.body.Description,
          Price: req.body.Price,
          PreparationTime: req.body.PreparationTime,
          ImageLink: imageLink,
          CreatedBy: userID,
          ModifiedBy: userID,
        };

        // Save dish data in database
        const dish = await Dish.addDish(productData);

        return res
          .status(201)
          .json({ message: "Dish uploaded successfully", dishID: dish._id });
      });
    } catch (error) {
      console.error("Error in addDish:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Function to update an existing dish in the database
  static async updateDish(req, res) {
    // Implement logic to update an existing dish
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
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the dish" });
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
      return res.status(500).json({ message: "Failed to get dish details" });
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
}

module.exports = DishController;
