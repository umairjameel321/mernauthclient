import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuth} from './helpers';

/**
 * If user is authenticated then let user view a component, other wise navigate to signin page
 * @param {*} param0 
 */
const PrivateRoute = ({component: Component, ...rest}) => (
<Route {...rest} render={
    props => isAuth() ? <Component {...props} /> : <Redirect to = {{
        pathname: '/signin', 
        state: {from:props.location}
    }} />
}>

</Route>
)


export default PrivateRoute;