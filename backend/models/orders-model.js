const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  orderItems: {
    type: [{
      name: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
      },
    }],
    required: true
  },
  shippingInfo: {
    address: {
      type: String,
      reqyured: true
    },
    city: {
      type: String,
      reqyured: true
    },
    postalCode: {
      type: String,
      reqyured: true
    },
    country: {
      type: String,
      reqyured: true
    },
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: {type: String},
    status: {type: String},
    paidAt: {type: String},
    email: {type: String},
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
}, {timestamps: true});

const Orders = mongoose.model(`Orders`, orderSchema);

module.exports = Orders;
