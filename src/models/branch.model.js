import mongoose from 'mongoose'

const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  location: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  address: {
    type: String
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPartner'
  }
})

export const Branch = mongoose.model('Branch', BranchSchema)