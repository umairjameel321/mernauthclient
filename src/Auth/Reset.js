import React, {useState, useEffect} from 'react';
import Layout from '../core/layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: "",
        buttonText: "Submit"
    })

     // similar to class based componentDidMount event
     useEffect(() => {
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token) {
            setValues({...values, name, token})
        }
    }, [])

    const {name, token, newPassword, buttonText} = values;

    const handleChange = (type) => (event) => {
        setValues({...values, [type]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {resetPasswordLink: token, newPassword}
        }).then(response => {
            console.log("Reset password SUCCESS: ", response);
            toast.success(response.data.message)
            setValues({...values, buttonText: 'Submitted'})
        }).catch(err => {
            console.log("Reset password ERROR: ", err.response);
            setValues({...values, buttonText: 'Submit'})
            toast.error(err.response.data.error)
        })

    }

    const passwordResetFrom = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">New Password</label>
                <input onChange={handleChange('newPassword')} defaultValue={newPassword} type="password" className="form-control" placeholder=" Type new password" required/>
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
                <h1 className="p-5 text-center">Hey {name}, type your new password</h1>
                {passwordResetFrom()}
            </div>
        </Layout>
    )
}

export default Reset;