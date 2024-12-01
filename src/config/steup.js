import AdminJS from 'adminjs'
import AdminJSFastify from '@adminjs/fastify'

import * as AdminJSMongoose from '@adminjs/mongoose'
import { authenticate, COOKIE_PASSWORD, sessionStore } from './config.js'
import { Admin, Customer, DeliveryPartner } from '../models/user.model.js'
import { Branch } from '../models/branch.model.js'
import { dark } from '@adminjs/themes'
import { Product } from '../models/product.model.js'
import { Category } from '../models/category.model.js'
import Order from '../models/order.model.js'
import { Counter } from '../models/counter.model.js'

AdminJS.registerAdapter(AdminJSMongoose)

export const admin = new AdminJS({
  resources: [
    {
      resource: Customer,
      options: {
        listProperties: ['isActivated', 'role', 'phone'],
        filterProperties: ['role', 'phone']
      }
    },
    {
      resource: DeliveryPartner,
      options: {
        listProperties: ['isActivated', 'role', 'email'],
        filterProperties: ['role', 'email']
      }
    },
    {
      resource: Admin,
      options: {
        listProperties: ['isActivated', 'role', 'email'],
        filterProperties: ['role', 'email']
      }
    },
    {
      resource: Product
    },
    {
      resource: Category
    },
    {
      resource: Branch
    },
    {
      resource: Order
    } ,{
      resource: Counter
    }
  ],

  branding: {
    companyName: 'Foodie',
    withMadeWithLove: false,
    defaultTheme: dark.id
  },
  rootPath: '/admin'
})

export const buildAdminRouter = async app => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword: COOKIE_PASSWORD,
      cookieName: 'adminjs'
    },
    app,
    {
      store: sessionStore,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  )
}
