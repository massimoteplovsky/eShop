import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";
import {changeOrderStep, resetOrder} from "../actions/order/order-actions";
import Shipping from "../components/shipping";
import Payment from "../components/payment";
import Order from "../components/order";
import Error from "../pages/error-page";

const COMPONENTS = ["shipping", "payment", "order"];

const CheckoutPage = ({userData}) => {

  const dispatch = useDispatch();
  const {cartItems} = useSelector(({cart}) => cart);
  const {orderStep, error} = useSelector(({order}) => order);

  const [steps, setStep] = useState({
    shipping: orderStep ? orderStep.steps.shipping : true,
    payment: orderStep ? orderStep.steps.payment :  false,
    order: orderStep ? orderStep.steps.order : false
  });

  const [activeComponent, setActiveComponent] = useState(orderStep ? orderStep.activeComponent : "shipping");

  useEffect(() => {
    dispatch(changeOrderStep({steps, activeComponent}));

    if (error) {
      return () => {
        dispatch(resetOrder());
      }
    }
  }, [dispatch, steps, activeComponent, error]);

  const setStepHandler = (name) => {
    setActiveComponent(name);
    setStep({...steps, [name]: true});
  };

  if (cartItems.length === 0) {
    return <Redirect to="/"/>
  }

  if (error) {
    return <Error error={error}/>
  }

  const showComponent = (activeComponent) => {
    const component = {
      shipping: <Shipping userData={userData} onSetStep={setStepHandler}/>,
      payment: <Payment userData={userData} onSetStep={setStepHandler}/>,
      order: <Order userData={userData} onSetStep={setStepHandler}/>
    }

    return component[activeComponent];
  }

  return (
    <>
      <div className="nav-buttons d-flex justify-content-center mb-3">
        {
          COMPONENTS.map((component, index) => {
            return (
              <Button
                key={`${index}-${Date.now()}`}
                variant={activeComponent === component ? "primary" : "secondary"}
                disabled={!steps[component]}
                onClick={() => setActiveComponent(component)}
              >
                {component}
              </Button>
            )
          })
        }
      </div>
      {showComponent(activeComponent)}
    </>
  )
}

export default CheckoutPage;
