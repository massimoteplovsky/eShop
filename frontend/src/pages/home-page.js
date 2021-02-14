import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "react-bootstrap";
import {fetchAllProducts, resetProducts} from "../actions/product/product-actions";
import Product from "../components/product";
import Loader from "../components/loader";
import ErrorPage from "../pages/error-page";
import ShowMoreButton from "../components/show-more-button";
import withLoading from "../hoc/withLoading";

const PRODUCTS_LIMIT = 4;

const HomePage = ({loading, onSetLoading}) => {
  const dispatch = useDispatch();
  const {error, data: {products, total}} = useSelector(({products}) => products.productsList);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProducts(PRODUCTS_LIMIT, offset));
      onSetLoading(false);
    }
    fetchData();
  }, [dispatch, onSetLoading, offset]);

  useEffect(() => {
    return () => {
      dispatch(resetProducts());
    }
  }, [dispatch]);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <ErrorPage error={error}/>
  }

  return (
    <>
      <h1>Products</h1>
      <Row>
        {
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>))
        }
      </Row>
      {
        products.length < total && (
          <Row className="justify-content-center">
            <ShowMoreButton onShowMore={() => setOffset((prevOffset) => prevOffset + PRODUCTS_LIMIT)}/>
          </Row>
        )
      }

    </>
  )
}

export default withLoading(HomePage);
