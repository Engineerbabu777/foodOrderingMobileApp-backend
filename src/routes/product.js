import { getAllCategories } from "../controllers/product/category"
import { getProductsById } from "../controllers/product/product"



export const categoryRoutes = async(fastify, options) => {
    fastify.get("/categories", getAllCategories)
}

export const productRoutes = async(fastify, options) => {
    fastify.get("/products/:categoryId", getProductsById)
}