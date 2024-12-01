import mongoose from 'mongoose'

// Base User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer', 'DeliveryPartner']
  },
  isActivated: {
    type: Boolean,
    default: false
  }
})

// Customer Schema!
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer', 'DeliveryPartner']
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'Customer',
    enum: ['Customer']
  },
  liveLocation: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  address: {
    type: String
  }
})

// Customer Schema!
const DeliveryPartnerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer', 'DeliveryPartner']
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'DeliveryPartner',
    enum: ['DeliveryPartner']
  },
  liveLocation: {
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
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
})

// Customer Schema!
const AdminSchema = new mongoose.Schema({
  name: {
    type: String
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer', 'DeliveryPartner']
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: 'Admin',
    enum: ['Admin']
  }
})


// export const User = mongoose.model('User', userSchema)
export const Customer = mongoose.model('Customer', CustomerSchema)
export const DeliveryPartner = mongoose.model('DeliveryPartner', DeliveryPartnerSchema)
export const Admin = mongoose.model('Admin', AdminSchema)