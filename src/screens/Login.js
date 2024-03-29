import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  let navigate = useNavigate()
  const [credentails, setcredentails] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentails.email,
        password: credentails.password
      })
    });
    const jsonRes = await response.json();
    console.log(jsonRes);

    if (!jsonRes.success) {
      alert("Enter valid credentials!") 
    } else {
      localStorage.setItem("userEmail", credentails.email);
      localStorage.setItem("authToken", jsonRes.authToken);
      navigate("/");
    }
  }
  const onChange = (event) => {
    setcredentails({ ...credentails, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentails.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentails.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>Sign Up</Link>
        </form>
      </div>
    </>
  )
}
