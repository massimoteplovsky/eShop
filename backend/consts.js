const RoutePrefix = {
  PRODUCTS: "/api/products",
  USERS: "/api/users",
  ORDERS: "/api/orders",
  CONFIG: "/api/config",
  UPLOAD: "/api/upload"
};

const HttpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

const DEFAULT_PORT = 5000;

module.exports = {
  RoutePrefix,
  HttpCode,
  DEFAULT_PORT
}
