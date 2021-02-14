import React, {useState} from "react";

const withLoading = (Component) => (props) => {
    const [loading, setLoading] = useState(true);
    return <Component {...props} loading={loading} onSetLoading={setLoading}/>
}

export default withLoading;
