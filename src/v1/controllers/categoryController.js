const Category = require("../service/categoryServices");
const Dish = require("../service/dishServices");

class CategoryController {
  static async CreateCategory(req, res) {
    const { name: Name, description: Description } = req.body;
    const userID = req.user.UserID;

    if (!Name || !Description) {
      return res
        .status(400)
        .json({ message: "Name and Description are required" });
    }

    try {
      const categoryID = await Category.createCategory({
        Name,
        Description,
        userID,
      });
      return res.status(201).json({
        message: "Category created successfully",
        CategoryID: categoryID,
      });
    } catch (error) {
      console.error("Error in CreateCategory:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async ModifyCategory(req, res) {
    const { id: categoryID } = req.params;
    const { name: Name, description: Description } = req.body;
    const userID = req.user.UserID;

    if (!categoryID) {
      return res.status(400).json({ message: "CategoryID is required" });
    }

    try {
      const category = await Category.getCategoryByID(categoryID);
      if (!category) {
        return res.status(404).json({ message: "Category does not exists" });
      }
      category.Name = Name || category.Name;
      category.Description = Description || category.Description;
      const success = await Category.updateCategory(
        categoryID,
        category,
        userID
      );
      if (success) {
        return res
          .status(200)
          .json({ message: "Category updated successfully" });
      } else {
        console.error("Error while update Category - interract with DB");
        return res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.error("Error in ModifyCategory:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async ViewCategory(req, res) {
    try {
      const categories = await Category.getAllCategories();
      return res.status(200).json({ categories });
    } catch (error) {
      console.error("Error in ViewCategory:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async ViewByID(req, res) {
    const { id: categoryID } = req.params;
    if (!categoryID) {
      return res.status(400).json({ message: "CategoryID is required" });
    }
    try {
      const category = await Category.getCategoryByID(categoryID);
      if (category) {
        return res.status(200).json({ category });
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      console.error("Error in ViewByID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async DeleteCategory(req, res) {
    const { id: categoryID } = req.params;
    if (!categoryID) {
      return res.status(400).json({ message: "CategoryID is required" });
    }
    try {
      const dishInCategory = await Dish.getDishesByCategoryID(categoryID);
      // cannot delete category while dishes are still linked with
      if (dishInCategory.length > 0) {
        return res.status(400).json({
          message:
            "There are still dishes linked to this category, please delete, or modify them first",
          dishes: dishInCategory,
        });
      }
      const success = await Category.deleteCategory(categoryID);
      if (success) {
        return res
          .status(200)
          .json({ message: "Category deleted successfully" });
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      console.error("Error in DeleteCategory:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = CategoryController;
