import { Category } from "../../models/category.model.js"


export const getAllCategories = async(req,res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}