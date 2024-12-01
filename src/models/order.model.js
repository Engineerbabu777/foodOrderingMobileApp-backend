import mongoose from "mongoose";
import { Counter } from "./counter.model.js";


const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "DeliveryPartner"
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Branch"
    },
    items:[
       { id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        item:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        count:{type: Number, required: true},}
    ],
    deliveryLocation:{
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        address: {type: String},
    },
    pickupLocation:{
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        address: {type: String},
    },
    deliveryPersonLocation:{
        latitude: {type: Number},
        longitude: {type: Number},
        address: {type: String},
    },
    status:{
        type: String,
        required: true,
        default:"available",
        enum: ["available", "confirm", "arriving", "cancelled","delivered"]
    },
    totalPrice:{type: Number, required: true},
  
},{
    timestamps: true
});


async function getNextSequenceValue(sequenceName){
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true,upsert: true}
    );
    return sequenceDocument.sequence_value;
}


orderSchema.pre("save" ,async function(next){
    if(this.isNew){
        const orderId = await getNextSequenceValue("orderId");
        this.orderId = `ORDR-${orderId.toString().padStart(5, "0")}`;
    }
    next(); 
})

const Order = mongoose.model("Order", orderSchema);

export default Order;