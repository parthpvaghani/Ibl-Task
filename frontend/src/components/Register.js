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
             birthDate:'',
             confirmPassword:''
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


    onRegister = (e) => {
        e.preventDefault()

        let date_regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/ ;
        let email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
        const {email,password,name,birthDate,confirmPassword} = this.state;
        if(!name){
            alert('Please enter name')
        }
        else if(!email_regex.test(email)){
            alert('Please enter valid email address')
        }
        else if(!date_regex.test(birthDate)){
          alert('Please enter Date in MM-DD-YYYY format')
        }
        else if(!password){
            alert('Please enter Password')
        }
        else if(!password_regex.test(password)){
            alert('Password should contain one uppercase letter one smallcase letter and one number with minimum length of 8 characters')
        }
        else{
            if(password == confirmPassword){
            axios.post(`${urls.serverUrl}auth/register`,{
                email:email,
                password:password,
                name:name,
                birthDate:birthDate
            }).then(res=>{
                console.log('success',res)
                let token = res.data.token;
                localStorage.setItem('token',token)
                alert('You are Registered Successfully!! ')
    
            })
            .catch(err=>{
                console.log('failure',err.response.data)
                alert(err.response.data.msg)
            })
        }
        else{
            alert('password not matched')
        }
        }
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
            <label>Birth Date</label>
              <input type="text" placeholder="Ex. MM-DD-YYYY" name="birthDate" onChange={this.handleChange}/>
             </div>
             <div style={{margin:'15px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <label>Password</label>
              <input type="password" name="password" onChange={this.handleChange}/>
            </div>
            <div style={{margin:'15px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" onChange={this.handleChange}/>
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
