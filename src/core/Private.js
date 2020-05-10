import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import {isAuth, getCookie, signout, updateUser} from '../Auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';

const Private = ({history}) => {
    const [values, setValues] = useState({
        role: '',
        name: "",
        email: "",
        password: "",
        buttonText: "Update"
    })

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                "Authorization": `Bearer ${getCookie('token')}`
            }
        }).then(response => {
            console.log("Private profile update view success", response);
            const {role, name, email} = response.data;
            setValues({...values, name, email, role})
        }).catch(error => {
            console.log("Profile Update view ERROR: ", error.response.data.error);
            // if token is expired
            if(error.response.status === 401) {
                signout(() => {
                    history.push('/');
                });

            }
        })
    }

    const {role, name, email, password, buttonText} = values;

    const handleChange = (type) => (event) => {
        setValues({...values, [type]: event.target.value});
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText: 'Updating...'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                "Authorization": `Bearer ${getCookie('token')}`
            },
            data: {name, password}
        }).then(response => {
            console.log("Private profile update SUCCESS", response);
            updateUser(response, () => {
                setValues({...values, buttonText: 'Updated'})
                toast.success("Profile Updated Successfully")
            }) 
        }).catch(err => {
            console.log("Private Profile update ERROR: ", err.response.data.error);
            setValues({...values, buttonText: 'Update'})
            toast.error(err.response.data.error)
        })

    }

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} defaultValue={name} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} defaultValue={password} type="password" className="form-control"/>
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
                <h1 className="pt-5 text-center">Profile</h1>
                <p className="lead text-center">Profile Update</p>
                {updateForm()}
            </div>
        </Layout>
    )
}

export default Private;