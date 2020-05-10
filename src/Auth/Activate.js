import React, {useState, useEffect} from 'react';
import Layout from '../core/layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import jwt from 'jsonwebtoken';
import 'react-toastify/dist/ReactToastify.min.css';

// match prop will grab the token from url 
const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: "",
        token: "",
        show: true
    });

    // similar to class based componentDidMount event
    useEffect(() => {
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token) {
            setValues({...values, name, token})
        }
    }, [])

    const {name, token, show} = values;

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        }).then(response => {
            console.log("ACCOUNT ACTIVATION SUCCESS", response);
            setValues({...values, show: false})
            toast.success(response.data.message)
        }).catch(err => {
            console.log("ACCOUNT ACTIVATION ERROR: ", err.response.data.error);
            toast.error(err.response.data.error);
        })

    }

    const activationLink = () => (
       <div class = "text-center">
           <h1 className="p-5">Hey {name}, ready to activate your account?</h1>
           <button className="btn btn-outline-primary text-center" onClick={clickSubmit}>Activate Account</button>
       </div>
    )
        
    return (
        <Layout>
            <div className = "col-md-6 offset-md-3">
                <ToastContainer/>           
                {activationLink()}
            </div>
        </Layout>
    )
}

export default Activate