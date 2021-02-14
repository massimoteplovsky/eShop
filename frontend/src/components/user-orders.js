import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUserOrders, resetOrder} from "../actions/order/order-actions";
import Loader from "../components/loader";
import Error from "../pages/error-page";
import UserOrdersTable from "./user-orders-table";
import withLoading from "../hoc/withLoading";

const UserOrders = ({loading, onSetLoading}) => {
  const dispatch = useDispatch();
  const {error, data: orders} = useSelector(({order}) => order.userOrders);

  useEffect(() => {

    const fetchData = async () => {
      await dispatch(getUserOrders());
      onSetLoading(false);
    };

    fetchData();

    return () => {
      dispatch(resetOrder());
    }
  }, [dispatch, onSetLoading]);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <Error error={error}/>
  }

  return (
    <>
      <h2>My orders</h2>
      {
        orders.length === 0 ?
          <p>You have no orders so far...</p>
          :
          <UserOrdersTable orders={orders}/>
      }
    </>
  )
}

export default withLoading(UserOrders);
