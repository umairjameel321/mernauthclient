import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../Auth/helpers';

const Layout = ({children, match, history}) => {
    const isActive = (path) => {
        if(match.path === path) {
            return {color: '#000', backgroundColor: '#fff'}
        } else {
            return {color: '#fff'}
        }
    }
    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
            </li>
            {!isAuth() && (
                <Fragment>
                     <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>Signin</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>Signup</Link>
                    </li> 
                </Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item" style={{color: "#fff"}}>
                    <Link to="/admin" className="nav-link" style={isActive('/admin')}>{isAuth().name}</Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item" style={{color: "#fff"}}>
                    <Link to="/private" className="nav-link" style={isActive('/private')}>{isAuth().name}</Link>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <span className="nav-link" style={{color: "#fff", cursor: 'pointer'}} onClick = {() => {
                        signout(() => {
                            history.push('/');
                        })
                    }}>Signout</span>
                </li>
            )}
            
        </ul>
    )
    return (
        <Fragment>
            {nav()}
            <div className="container">
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);