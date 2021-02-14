const mongoose = require("mongoose");
const {Products} = require("../models");

class ProductService {
  async fetchAllProducts(limit, offset) {
    const total = await Products.countDocuments();
    const productsList = await Products.find({}).limit(limit).skip(offset);
    return {total, productsList};
  };

  async fetchProductById(prodID) {
    return await Products.findById({_id: prodID});
  }

  async createProduct(productData) {
    return await Products.create(productData);
  }

  async updateProduct(prodID, productData) {
    return await Products.findByIdAndUpdate({_id: prodID}, {$set: {...productData}}, {new: true});
  }

  async removeProduct(prodID) {
    return await Products.deleteOne({_id: prodID});
  }
}

module.exports = ProductService;

