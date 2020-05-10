import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';

const Facebook = ({informParent = f => f}) => {
    const responseFacebook = (response) => {
        console.log(response);
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: {userID: response.userID, accessToken: response.accessToken}
        })
        .then(response => {
            console.log("Facebook SIGNIN SUCCESS", response);
            // inform parent component
            informParent(response);
        })
        .catch(error => {
            console.log("Facebook SIGNIN ERROR", error);
        })
    }

    return (
        <div className="pb-3">
           {/* <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} 
                            className = "btn btn-primary btn-lg btn-block">
                                <i className="fab fa-facebook pr-2"></i>
                                Login with facebook
                    </button>
                )}
                /> */}

                <FacebookLogin
                    appId={`${process.env.REACT_APP_FACEBOOK_ID}`}
                    autoLoad={true}
                    callback={responseFacebook} />
        </div>

    )
}

export default Facebook

