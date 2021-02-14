import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap";
import {fetchSingleProduct} from "../actions/product/product-actions";
import {addItemToCart} from "../actions/cart/cart-actions";
import Rating from "../components/rating";
import Loader from "../components/loader";
import Stock from "../components/stock";
import Error from "../pages/error-page";
import withLoading from "../hoc/withLoading";

const ProductPage = ({loading, onSetLoading, match, history}) => {
  const prodID = match.params.id;
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const {error, data: product} = useSelector(({products}) => products.singleProduct);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSingleProduct(prodID));
      onSetLoading(false);
    }
    fetchData();
  }, [prodID, dispatch, onSetLoading]);

  const addToCartHandler = () => {
    dispatch(addItemToCart(prodID, qty));
  }

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <Error error={error}/>
  }

  const isAvailable = product.countInStock > 0 ? `In stock (${product.countInStock})` : "Out of stock";
  const isDisabled = product.countInStock === 0;
  const generateStockTemplate = (product) => {
    return (
      <ListGroup.Item>
        <Row>
          <Col>Qty</Col>
          <Col>
            <Stock product={product} qty={qty} onMakeAction={setQty}/>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <Button className="btn btn-light my-3" onClick={() => history.goBack()}>Go back</Button>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} reviewsCount={product.numReviews}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {isAvailable}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && generateStockTemplate(product)}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  onClick={addToCartHandler}
                  type="button"
                  disabled={isDisabled}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default withLoading(ProductPage);
