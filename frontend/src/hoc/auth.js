import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {checkUserAuth} from "../actions/user/user-actions";
import Loader from "../components/loader";
import withLoading from "./withLoading";

const PATHS = ["/login", "/register"];

const auth = (Component, isProtected = false, isAdminRoute = false) => {
  const Auth = (props) => {
    const {loading, onSetLoading} = props;
    const currentPath = props.location.pathname;
    const dispatch = useDispatch();
    const {data: userData} = useSelector(({user}) => user.auth);

    useEffect(() => {
      const chechAuth = async () => {
        await dispatch(checkUserAuth());
        onSetLoading(false);
      }
      chechAuth();
    }, [dispatch, onSetLoading]);

    if (loading) {
      return <Loader/>
    }

    if (!userData && isProtected) {
      return <Redirect to="/login"/>;
    }

    if (userData && PATHS.includes(currentPath)) {
      return <Redirect to="/"/>;
    }

    if (userData && !userData.isAdmin && isAdminRoute) {
      return <Redirect to="/"/>;
    }

    return <Component {...props} userData={userData}/>;
  }
  return withLoading(Auth);
};

export default auth;
