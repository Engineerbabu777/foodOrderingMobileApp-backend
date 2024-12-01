import mongoose from "mongoose";
import { Product } from "./src/models/product.model.js";
import { Category } from "./src/models/category.model.js";
import { categories, products } from "./seedData.js";


async function seedDatabase(){


    try {
       await mongoose.connect("mongodb+srv://awaismumtaz0099:778677867786a..@cluster0.3so1bcq.mongodb.net/blinkit") 

       await Product.deleteMany({});
       await Category.deleteMany({});


       const categoryDocs = await Category.insertMany(categories);
       const categoryMap = categoryDocs.reduce((map,category) => {
          map[category.name] = category._id;
          return map;
       },{})

       const productWithCategoryIds = products.map((product) => ({
        ...product,
        category:categoryMap[product.category]
       }))

       await Product.insertMany(productWithCategoryIds)

       console.log("Database seeded successfully")

    } catch (error) {
        console.log(error);

    }
}


seedDatabase()