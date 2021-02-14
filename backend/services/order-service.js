const {Orders} = require("../models");

class OrderService {
  async createOrder(orderData) {
    return await Orders.create(orderData);
  };

  async findOrderById(orderID) {
    return await Orders.findById({_id: orderID}).populate("user");
  }

  async updateOrder(orderID, orderData) {
    return await Orders.findByIdAndUpdate({_id: orderID}, {$set: {...orderData}}, {new: true}).populate("user");
  }

  async fetchOrdersByUserId(userID) {
    return await Orders.find({user: userID});
  }
}

module.exports = OrderService;
