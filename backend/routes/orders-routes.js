const {Router} = require("express");
const asyncHandler = require('express-async-handler');
const {OrderService} = require("../services");
const {auth} = require("../middlewares");
const {createError} = require("../helpers");
const {HttpCode} = require("../consts");

const ordersRouter = new Router();
const orderService = new OrderService();

// @desc   Create order
// @route  POST /api/orders
// @access Private
ordersRouter.post("/", auth, asyncHandler( async (req, res, next) => {
  const {cartItems, shippingInfo, paymentMethod, totalPrice} = req.body;
  const userID = req.user._id;

  console.log(cartItems)

  const newOrder = await orderService.createOrder({
    orderItems: cartItems,
    shippingInfo,
    paymentMethod,
    totalPrice,
    user: userID
  });

  return res.status(HttpCode.SUCCESS).json(newOrder);
}));

// @desc   Get order by ID
// @route  GET /api/orders
// @access Private
ordersRouter.get("/:orderID", auth, asyncHandler( async (req, res, next) => {
  const {orderID} = req.params;
  const order = await orderService.findOrderById(orderID);

  if (!order) {
    throw createError(HttpCode.NOT_FOUND, "Order not found");
  }

  return res.status(HttpCode.SUCCESS).json(order);
}));

// @desc   Update order by ID (pay and delivery information)
// @route  PUT /api/orders
// @access Private
ordersRouter.put("/:orderID", auth, asyncHandler( async (req, res, next) => {
  const {orderID} = req.params;
  const orderData = req.body;
  const updatedOrder = await orderService.updateOrder(orderID, orderData);

  if (!updatedOrder) {
    throw createError(HttpCode.NOT_FOUND, "Order not found");
  }

  return res.status(HttpCode.SUCCESS).json(updatedOrder);
}));

// @desc   Get user's orders
// @route  GET /api/orders
// @access Private
ordersRouter.get("/", auth, asyncHandler( async (req, res, next) => {
  const userID = req.user._id;
  const orders = await orderService.fetchOrdersByUserId(userID);
  return res.status(HttpCode.SUCCESS).json(orders);
}));


module.exports = ordersRouter;
