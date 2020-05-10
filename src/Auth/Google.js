import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const Google = ({informParent = f => f}) => {
    const responseGoogle = (response) => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/google-login`,
            data: {idToken: response.tokenId}
        })
        .then(response => {
            console.log("GOOGLE SIGNIN SUCCESS", response);
            // inform parent component
            informParent(response);
        })
        .catch(error => {
            console.log("GOOGLE SIGNIN ERROR", error.response);
        })
    }

    return (
        <div className="pb-3">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <button onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            className = "btn btn-danger btn-lg btn-block">
                                <i className="fab fa-google pr-2"></i>
                                Login with Google
                    </button>
                  )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>

    )
}

export default Google

