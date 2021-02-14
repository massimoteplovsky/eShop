import {
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  RESET_PRODUCTS,
  CREATE_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT
} from "./product-types";
import {actionCreator, asyncActionCreator} from "../../helpers";
import {ApiPath} from "../../consts";

export const fetchProducts = asyncActionCreator(FETCH_PRODUCTS);
export const fetchProduct = asyncActionCreator(FETCH_SINGLE_PRODUCT);
export const remove = asyncActionCreator(REMOVE_PRODUCT);
export const createProduct = asyncActionCreator(CREATE_PRODUCT);
export const update = asyncActionCreator(UPDATE_PRODUCT);
export const resetProducts = actionCreator(RESET_PRODUCTS);

// Create a new product
export const createNewProduct = (productData) => async (dispatch, _, api) => {
  try {
    dispatch(createProduct.request());
    const newProduct = await api.post(`/${ApiPath.PRODUCTS}`, productData);
    dispatch(createProduct.success(newProduct));
  } catch(err) {
    dispatch(createProduct.failure(err));
  }
}

// Update product
export const updateProduct = (prodID, productData) => async (dispatch, _, api) => {
  try {
    dispatch(update.request());
    const updatedProduct = await api.put(`/${ApiPath.PRODUCTS}/${prodID}`, productData);
    dispatch(update.success(updatedProduct));
  } catch(err) {
    dispatch(update.failure(err));
  }
}

// Remove a product
export const removeProduct = (prodID) => async (dispatch, getState, api) => {
  try {
    dispatch(remove.request());
    await api.delete(`/${ApiPath.PRODUCTS}/${prodID}`);
    const prevProducts = getState().products.productsList.data.products;
    const products = prevProducts.filter((product) => product._id !== prodID);
    dispatch(remove.success({products, total: 0}));
  } catch(err) {
    dispatch(remove.failure(err));
  }
}

// Fetch all products action
export const fetchAllProducts = (limit = null, offset = null) => async (dispatch, getState, api) => {
  try {
    dispatch(fetchProducts.request());
    const {productsList, total} = await api.get(`/${ApiPath.PRODUCTS}`, {params: {limit, offset}});
    const prevProducts = getState().products.productsList.data.products;
    const products = [...prevProducts, ...productsList];
    dispatch(fetchProducts.success({products, total}));
  } catch(err) {
    dispatch(fetchProducts.failure(err));
  }
}

// Fetch a single product by id action
export const fetchSingleProduct = (prodID) => async (dispatch, _, api) => {
  try {
    dispatch(fetchProduct.request());
    const product = await api.get(`/${ApiPath.PRODUCTS}/${prodID}`);
    dispatch(fetchProduct.success(product));
    return product;
  } catch (err) {
    dispatch(fetchProduct.failure(err));
  }
}
