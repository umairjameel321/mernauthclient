import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import {authenticate, isAuth} from './helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import Google from './Google';
import Facebook from './Facebook';

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email: "u.jameel@fecundity.com",
        password: "hello123",
        buttonText: "Submit"
    })

    const {email, password, buttonText} = values;

    const handleChange = (type) => (event) => {
        setValues({...values, [type]: event.target.value});
    }

    /**
     * This is for login with Google
     * @param {*} response 
     */
    const informParent = (response) => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        }).then(response => {
            console.log("SIGNIN SUCCESS", response);
            // save the response (user, token) in localstorage/cookie
            authenticate(response, () => {
                setValues({...values, email: '', password: ''})
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
            })
        }).catch(err => {
            console.log("SIGNIN ERROR: ", err.response);
            setValues({...values, buttonText: 'Submit'})
            toast.error(err.response.data.error)
        })

    }

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')}defaultValue={email} type="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')}defaultValue={password} type="password" className="form-control"/>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>

        </form>
    )

    return (
        <Layout>
            <div className = "col-md-6 offset-md-3">
                <ToastContainer/>
                {isAuth() ? <Redirect to="/" />: null}
                <h1 className="p-5 text-center">Signin</h1>
                {signInForm()}
                Don't have an account? 
                <Link to = "/signup" className = "btn btn-sm">Create Here</Link> <br/> <br/>
                <Link to = "/auth/password/forgot" className = "btn btn-sm btn-outline-danger">Forgot Password?</Link>
                <Google informParent={informParent}/>
                <Facebook informParent={informParent}/>
            </div>
        </Layout>
    )
}

export default Signin;