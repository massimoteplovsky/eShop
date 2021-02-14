import React from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import {formatDate} from "../helpers";

const UserOrdersTable = ({orders}) => {
  return (
    <Table className="table-sm text-center user-orders" stripped="true" bordered hover responsive>
      <thead>
        <tr className="bg-primary text-white">
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>METHOD</th>
          <th>PAID</th>
          <th>DELIVERED</th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map((order) => {
            return (
              <tr key={order._id}>
                <td>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td className={`${order.isPaid ? "bg-success" : "bg-danger"} text-light`}>
                  {order.isPaid ? `Yes - ${formatDate(order.paymentResult.paidAt)}` : "No"}
                </td>
                <td className={`${order.isDelivered ? "bg-success" : "bg-danger"} text-light`}>
                  {order.isDelivered ? `Yes - ${formatDate(order.deliveredAt)}` : "No"}
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </Table>
  )
}

export default UserOrdersTable;
