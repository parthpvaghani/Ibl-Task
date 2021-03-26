import React, { Component } from 'react'
import axios from 'axios'
import {urls} from './base-urls'
 
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        email:'',
        password:''
        }
    }
    


    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onLogin = (e) => {

        e.preventDefault()
        const {email,password} = this.state
        axios.post(`${urls.serverUrl}auth/authenticate`,{
            email:email,
            password:password
        }).then(res=>{
            console.log('success',res)
            let token = res.data.token;
            localStorage.setItem('token',token)
            window.location.href='/dashboard'
        }).catch(err=>{
            console.log('failure',err)
            alert(err.response.data.msg)
        })

    }

    render() {
        return (
            <div className="login__container">
            <form onSubmit={this.onLogin} className="login__form">
            <div style={{margin:'15px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <label> Email Id </label>
              <input type="text" name="email" onChange={this.handleChange}/>
             </div>
             <div style={{margin:'15px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <label>Password</label>
              <input type="password" name="password" onChange={this.handleChange}/>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <button type="submit" style={{margin:'10px'}}>Login</button>
            <button style={{margin:'10px'}} onClick={()=>{window.location.href='/register'}}>Register</button>
            </div>
            </form>
            </div>
        )
    }
}
