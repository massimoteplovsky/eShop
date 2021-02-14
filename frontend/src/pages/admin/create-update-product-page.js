import React, {useState, useEffect} from "react";
import axios from "axios";
import {API_URL} from "../../consts";
import {useSelector, useDispatch} from "react-redux";
import {Form, Button} from "react-bootstrap";
import {
  createNewProduct,
  fetchSingleProduct,
  resetProducts,
  updateProduct
} from "../../actions/product/product-actions";
import FormContainer from "../../hoc/layout/form-container";
import Message from "../../components/message";
import FormFieldError from "../../components/form-field-error";
import Error from "../error-page";
import Dropzone from "../../components/file-upload";

const generateNewFormData = (data, formData) => {
  return Object.keys(data).reduce((obj, key) => {
    if (key in formData) {
      obj[key] = data[key];
    }
    return obj;
  }, {});
}

const CreateUpdateProductPage = ({history, match}) => {

  const dispatch = useDispatch();
  const {loading, error, success: createUpdateSuccess} = useSelector(({products}) => products.newProduct);
  const {error: productError, success: productSuccess} = useSelector(({products}) => products.singleProduct);
  const prodID = match.params.id;
  const isEditMode = Boolean(prodID);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "/uploads/image-1613232698424.jpg",
    brand: "",
    category: "",
    price: "",
    countInStock: ""
  });
  const [image, setImage] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      const product = await dispatch(fetchSingleProduct(prodID));
      if (product) {
        const newFormData = generateNewFormData(product, formData);
        setFormData(newFormData);
      }
    }

    if (createUpdateSuccess) {
      history.push("/admin/products");
      dispatch(resetProducts());
    }

    if (isEditMode && !productSuccess) {
      fetchData();
    }
  }, [dispatch, formData, prodID, history, createUpdateSuccess, productSuccess, isEditMode]);

  useEffect(() => {
    return () => {
      dispatch(resetProducts());
    }
  }, [dispatch]);

  if (productError || (error && !error.data)) {
    return <Error error={productError || error}/>
  }

  const setFormDataHandler = ({name, value}) => {
    setFormData({...formData, [name]: value});
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateProduct(prodID, formData));
      return;
    }

    dispatch(createNewProduct(formData));
  }

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

        const config = {
          headers: {
            "content-type" : "multipart/form-data"
          }
        }
        try {
          const {data} = await axios.post(`${API_URL}/upload`, formData, config);
          console.log(data)
          setImage(data)
        } catch (err) {
          console.log(err);
        }
  }

  const setImageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  console.log(image);

  return (
    <FormContainer>
      <h1>{`${isEditMode ? "Edit" : "Create"}`} product</h1>
      {error && <Message msg={error.message}/>}
      <img src={image} alt=""/>
      <Form onSubmit={(e) => submitHandler(e)}>
        {/* <Dropzone onSetImage={setImage}/> */}
        <Form.Group controlId="name">
          <Form.File
            id="image-file"
            label="Choose file"
            custom
            accept="image/*"
            onChange={(e) => fileUploadHandler(e)}
          ></Form.File>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className={error && error.data.name ? "field-error" : ""}
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.name) && <FormFieldError msg={error.data.name}/>}
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className={error && error.data.description ? "field-error" : ""}
            as="textarea"
            rows={3}
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.description) && <FormFieldError msg={error.data.description}/>}
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            className={error && error.data.brand ? "field-error" : ""}
            type="text"
            name="brand"
            placeholder="Enter product brand"
            value={formData.brand}
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.brand) && <FormFieldError msg={error.data.brand}/>}
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            className={error && error.data.category ? "field-error" : ""}
            type="text"
            name="category"
            placeholder="Enter product category"
            value={formData.category}
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.category) && <FormFieldError msg={error.data.category}/>}
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            className={error && error.data.price ? "field-error" : ""}
            type="number"
            name="price"
            placeholder="Enter product price"
            value={formData.price}
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.price) && <FormFieldError msg={error.data.price}/>}
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label>Count in stock</Form.Label>
          <Form.Control
            className={error && error.data.countInStock ? "field-error" : ""}
            type="number"
            name="countInStock"
            placeholder="Enter product quantity"
            value={formData.countInStock}
            onChange={(e) => setFormDataHandler(e.target)}
          >
          </Form.Control>
          {(error && error.data.countInStock) && <FormFieldError msg={error.data.countInStock}/>}
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {`${isEditMode ? "Edit" : "Create"}`} product
        </Button>
      </Form>
    </FormContainer>
  )
}

export default CreateUpdateProductPage;
