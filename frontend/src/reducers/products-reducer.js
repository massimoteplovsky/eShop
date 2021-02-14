import {
  RESET_PRODUCTS
} from "../actions/product/product-types";
import {
  fetchProducts,
  fetchProduct,
  createProduct,
  remove,
  update
} from "../actions/product/product-actions";
import {reducerHandler} from "../helpers";

const initialAsyncState = {
  loading: false,
  success: false,
  data: null,
  error: null
}

const initialState = {
  productsList: {...initialAsyncState, data: {total: 0, products: []}},
  singleProduct: {...initialAsyncState, data: {}},
  newProduct: initialAsyncState
};

const productsReducer = (state = initialState, {type, payload = null}) => {
  switch(type) {
    case createProduct.REQUEST:
    case createProduct.SUCCESS:
    case createProduct.FAILURE:
      return {
        ...state,
        newProduct: reducerHandler(state.newProduct, {type, payload}, createProduct)
      }
    case update.REQUEST:
    case update.SUCCESS:
    case update.FAILURE:
      return {
        ...state,
        newProduct: reducerHandler(state.newProduct, {type, payload}, update)
      }
    case remove.REQUEST:
    case remove.SUCCESS:
    case remove.FAILURE:
      return {
        ...state,
        productsList: reducerHandler(state.productsList, {type, payload}, remove)
      }
    case fetchProducts.REQUEST:
    case fetchProducts.SUCCESS:
    case fetchProducts.FAILURE:
      return {
        ...state,
        productsList: reducerHandler(state.productsList, {type, payload}, fetchProducts)
      }
    case fetchProduct.REQUEST:
    case fetchProduct.SUCCESS:
    case fetchProduct.FAILURE:
      return {
        ...state,
        singleProduct: reducerHandler(state.singleProduct, {type, payload}, fetchProduct)
      }
    case RESET_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};

export default productsReducer;
