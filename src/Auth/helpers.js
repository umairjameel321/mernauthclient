import cookie from 'js-cookie';

// set a cookie
export const setCookie = (key, value) => {
    if(window !== undefined) {
        cookie.set(key, value, {expires: 1}); // expires in 1 day
    }
}

// remove from cookie
export const removeCookie = (key) => {
    if(window !== undefined) {
        cookie.remove(key);
    }
}

// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key) => {
    if(window !== undefined) {
        return cookie.get(key);
    }
}


// set in localstorage
export const setLocalStorage = (key, value) => {
    if(window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// remove from localstorage
export const removeLocalStorage = (key) => {
    if(window !== undefined) {
        localStorage.removeItem(key)
    }
}

//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log("Authenticate helper on signin response");
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
}

// access user info from localstorage
export const isAuth = () => {
    if(window !== undefined && getCookie('token')) {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false;
    }
}

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

export const updateUser = (updatedData, next) => {
    console.log('Update user in localstorage helpers', updatedData);
    if(typeof window !== 'undefined') {
        let authUser = JSON.parse(localStorage.getItem('user'));
        authUser = updatedData.data;
        localStorage.setItem('user', JSON.stringify(authUser));
    }
    next();
}