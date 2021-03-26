import React, { Component } from 'react'
import axios from 'axios'
import {urls} from './base-urls'

export default class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             name:'',
        }
    }

    componentDidMount(){
        localStorage.clear()

    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    sendWelcomeMail = () => {
        const {email} = this.state;
        axios.post(`${urls.serverUrl}mail/sendregsuccessmail`,{
            email:email,
        }).then(res=>{
            console.log('success',res)
        })
        .catch(err=>{
            console.log('failure',err.response.data)
        })
    }

    onRegister = (e) => {
        e.preventDefault()
        const {email,password,name} = this.state;
        axios.post(`${urls.serverUrl}auth/register`,{
            email:email,
            password:password,
            name:name,
        }).then(res=>{
            console.log('success',res)
            let token = res.data.token;
            localStorage.setItem('token',token)
            alert('You are Registered Successfully!! ')
            this.sendWelcomeMail()

        })
        .catch(err=>{
            console.log('failure',err.response.data)
            alert(err.response.data.msg)
        })
    }

    render() {
        return (
            <div className="register__container">
              <form  className="register__form">
           
             <div style={{margin:'15px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <label>Name</label>
            <input type="text" name="name" onChange={this.handleChange}/>
             </div>
             <div style={{margin:'15px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <label>Email Id</label>
              <input type="text" name="email" onChange={this.handleChange}/>
             </div>
             <div style={{margin:'15px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <label>Password</label>
              <input type="password" name="password" onChange={this.handleChange}/>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <button  onClick={this.onRegister} style={{margin:'10px'}} >Register</button>
            
            <p style={{margin:'10px',cursor:'pointer',textAlign:'center'}} onClick={()=>{window.location.href='/'}}>Already Registered? Sign in!</p>

            </div>
            </form>
            </div>


       
        )
    }
}
