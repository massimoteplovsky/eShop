const {Router} = require("express");
const asyncHandler = require("express-async-handler");
const {auth, admin} = require("../middlewares");
const {ProductService} = require("../services");
const {
  createError,
  validateFormByFields,
  insertFieldError
} = require("../helpers");
const {newProductsFormFieldsRules} = require("../form-validator");
const {HttpCode} = require("../consts");

const productsRouter = new Router();
const productService = new ProductService();

// @desc   Create new product
// @route  POST /api/products
// @access Private/Admin
productsRouter.post("/", auth, admin, ...newProductsFormFieldsRules, asyncHandler( async (req, res, next) => {
  const user = req.user;
  const productData = req.body;
  let fieldsErrors = validateFormByFields(req);

  if (Object.keys(fieldsErrors).length > 0) {
    throw createError(HttpCode.BAD_REQUEST, "Wrong product data", fieldsErrors);
  }

  const newProduct = await productService.createProduct({...productData, user: user._id});

  return res.status(HttpCode.CREATED).json(newProduct);
}));

// @desc   Update product
// @route  PUT /api/products/:prodID
// @access Private/Admin
productsRouter.put("/:prodID", auth, admin, ...newProductsFormFieldsRules, asyncHandler( async (req, res, next) => {
  const {prodID} = req.params;
  const productData = req.body;
  let fieldsErrors = validateFormByFields(req);

  if (Object.keys(fieldsErrors).length > 0) {
    throw createError(HttpCode.BAD_REQUEST, "Wrong product data", fieldsErrors);
  }

  const product = await productService.fetchProductById(prodID);

  if (!product) {
    throw createError(HttpCode.NOT_FOUND, "Product not found");
  }

  const updatedProduct = await productService.updateProduct(prodID, productData);

  return res.status(HttpCode.SUCCESS).json(updatedProduct);
}));

// @desc   Delete product
// @route  DELETE /api/products/:prodID
// @access Private/Admin
productsRouter.delete("/:prodID", auth, admin, asyncHandler( async (req, res, next) => {
  const {prodID} = req.params;
  const product = await productService.fetchProductById(prodID);

  if (!product) {
    throw createError(HttpCode.NOT_FOUND, "Product not found");
  }

  const removedProduct = await productService.removeProduct(prodID);

  return res.status(HttpCode.SUCCESS).json(removedProduct);
}));

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
productsRouter.get("/", asyncHandler( async (req, res, next) => {
  const {limit, offset} = req.query;
  const {total, productsList} = await productService.fetchAllProducts(Number(limit), Number(offset));
  return res.status(HttpCode.SUCCESS).json({total, productsList});
}));

// @desc   Fetch single product by ID
// @route  GET /api/products/:id
// @access Public
productsRouter.get("/:prodID", asyncHandler( async (req, res, next) => {
  const prodID = req.params.prodID;
  const product = await productService.fetchProductById(prodID);

  if (!product) {
    throw createError(HttpCode.NOT_FOUND, "Product not found");
  }

  return res.status(HttpCode.SUCCESS).json(product);
}));

module.exports = productsRouter;
