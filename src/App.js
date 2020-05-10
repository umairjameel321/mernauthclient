import React from 'react';
import Layout from './core/layout';

const App = () => {
  return (
    <Layout>
      <div className = "col-md-6 offset-md-3 text-center">
        <h1 className="p-5">Hello! This is a MERN Stack Authentication Bioler Plate</h1>
        <h2>MERN Stack</h2>
        <p>Signin, Signup, forgotpassword, resetpassword, Login with google/facebook</p>
      </div>
    </Layout>
  )
}

export default App;
