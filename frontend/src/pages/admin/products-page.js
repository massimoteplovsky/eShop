import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Table, Button, Row, Col} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {fetchAllProducts, resetProducts, removeProduct} from "../../actions/product/product-actions";
import Error from "../error-page";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {error, data: {products}} = useSelector(({products}) => products.productsList);

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      dispatch(resetProducts());
    }
  }, [dispatch]);

  if (error) {
    return <Error error={error}/>
  }

  const deleteProductHandler = (prodID) => {
    dispatch(removeProduct(prodID));
  }

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h1>Products List</h1>
        </Col>
        <Col className="text-right">
          <Link
            to="/admin/products/create-update"
            className="btn btn-primary my-3"
          >
            <i className="fas fa-plus mr-1"></i> Create Product
          </Link>
        </Col>
      </Row>

      <Table className="table-sm text-center" stripped="true" bordered hover responsive>
        <thead>
          <tr className="bg-primary text-white">
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>STOCK</th>
          </tr>
        </thead>
        <tbody className="text-size">
          {
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/products/create-update/${product._id}`}>
                      <Button
                        variant="light"
                        className="btn-sm"
                      >
                        <i className="fas fa-edit"/>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {deleteProductHandler(product._id)}}
                    >
                      <i className="fas fa-trash"/>
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
}

export default ProductsPage;
