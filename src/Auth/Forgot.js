import React, {useState} from 'react';
import Layout from '../core/layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({history}) => {
    const [values, setValues] = useState({
        email: "u.jameel@fecundity.io",
        buttonText: "Submit"
    })

    const {email, buttonText} = values;

    const handleChange = (type) => (event) => {
        setValues({...values, [type]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: {email}
        }).then(response => {
            console.log("Forgot password SUCCESS: ", response);
            toast.success(response.data.message)
            setValues({...values, buttonText: 'Submitted'})
        }).catch(err => {
            console.log("Forgot password ERROR: ", err.response);
            setValues({...values, buttonText: 'Submit'})
            toast.error(err.response.data.error)
        })

    }

    const passwordForgotFrom = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')}defaultValue={email} type="email" className="form-control"/>
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
                <h1 className="p-5 text-center">Forgot password</h1>
                {passwordForgotFrom()}
            </div>
        </Layout>
    )
}

export default Forgot;