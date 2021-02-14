import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Table, Button} from "react-bootstrap";
import {fetchAllUsers, removeUser, resetUsers} from "../../actions/user/user-actions";
import {formatDate} from "../../helpers";
import Error from "../error-page";

const UsersPage = () => {
  const dispatch = useDispatch();
  const {error, data: users} = useSelector(({user}) => user.users);

  useEffect(() => {
    dispatch(fetchAllUsers());

    return () => {
      dispatch(resetUsers());
    }
  }, [dispatch]);

  if (error) {
    return <Error error={error}/>
  }

  const deleteUserHandler = (userID) => {
    dispatch(removeUser(userID));
  }

  return (
    <>
      <h1>Users List</h1>
      <Table className="table-sm text-center" stripped="true" bordered hover responsive>
        <thead>
          <tr className="bg-primary text-white">
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>REGISTERED</th>
          </tr>
        </thead>
        <tbody className="text-size">
          {
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{`${user.firstname} ${user.lastname}`}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>{user.isAdmin ? <i className="fas fa-check text-success"/> : <i className="fas fa-times text-danger"/>}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {deleteUserHandler(user._id)}}
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

export default UsersPage;
