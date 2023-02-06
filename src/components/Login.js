import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const host = "http://localhost:5000";




const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""});
    let history = useNavigate();
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
            body: JSON.stringify({email: credentials.email,password:credentials.password}),
          });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            //Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged In Successfully" , "success");

            history('/')
        }
        else{
            // alert("Invalid Credentials")
            props.showAlert("Invalid Credentials" , "danger");
        }
    }
    
  return (
    <>
    <div className="container"><h2 className='my-2'>Login to Continue to iNotebook</h2></div>
    <div className="container my-4 mx-2">
    <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}

export default Login
