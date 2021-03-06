import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import {isAuth} from './helpers';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: "umairjameel",
        email: "umairjameel321@gmail.com",
        password: "hello123",
        buttonText: "Submit"
    })

    const {name, email, password, buttonText} = values;

    const handleChange = (type) => (event) => {
        setValues({...values, [type]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email, password}
        }).then(response => {
            console.log("SIGNUP SUCCESS", response);
            setValues({...values, name: '', email: '', password: ''})
            toast.success(response.data.message)
        }).catch(err => {
            console.log("SIGNUP ERROR: ", err.response.data);
            setValues({...values, buttonText: 'Submit'})
            toast.error(err.response.data.error)
        })

    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')}defaultValue={name} type="text" className="form-control"/>
            </div>
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
                <h1 className="p-5 text-center">Signup</h1>
                {signUpForm()}
                Already have an account? 
                <Link to = "/signin" className = "btn btn-sm">SignIn Here</Link> <br/> <br/>
            </div>
        </Layout>
    )
}

export default Signup;