import { Product } from "../../models/product.model.js";




// get products by id!
export const getProductsById = async(req,res) => {
    const {category} = req.params;

    try {
        const products = await Product.find({category: category})
        .select("-category")
        .exec();


        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}