import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const host = "http://localhost:5000";
const Signup = (props) => {
    const [credentials,setCredentials] = useState({name:"",email:"",password:""});
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    let history = useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(credentials.password!== credentials.cpassword)
        {
            // alert("Passwords Do not Match")
            props.showAlert("Confirm Password Does Not Match" , "warning");

            return;
        }

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
            body: JSON.stringify({name:credentials.name, email: credentials.email,password:credentials.password}),
          });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            //Save the auth token and redirect
            props.showAlert("Signed In Successfully" , "success");
            localStorage.setItem('token',json.authtoken);
            history('/')
        }
        else{
            // alert("Invalid Credentials")
            props.showAlert("Invalid Credentials" , "danger");

        }
    }
  return (
    <>
    <div className="container"><h2 className='my-2'>Create an Account to Use iNotebook</h2></div>

    <div className="container my-4 mx-3">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name='name' value={credentials.name} onChange={onChange} className="form-control" id="name" />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="email" />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' value={credentials.password} minLength={5} onChange={onChange} className="form-control" id="password"/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name='cpassword' value={credentials.cpassword} minLength={5} onChange={onChange} className="form-control" id="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    </>
  )
}

export default Signup
