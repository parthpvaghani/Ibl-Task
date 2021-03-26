import React, { Component } from 'react'
import axios from 'axios';
import {urls} from './base-urls'

export default class Topic extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             topicname:''
        }
    }

    addTopic = () =>{
        if(!this.state.topicname){
            alert('please enter topicname')
        }else{
        let token = localStorage.getItem('token');
        axios.post(`${urls.serverUrl}topic/addtopic`,{
            token:token,
            topicName:this.state.topicname
        }).then(res=>{
            console.log('success',res)
        }).catch(err=>{
            console.log('failure',err)
            // alert(err.response.data.msg)
        })
    }
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
    }
    
    render() {
        return (
            <div>

                <input type='text' name="topicname" onChange={this.handleChange}/>
                <button onClick={this.addTopic}>Add Topic</button>
            </div>
        )
    }
}
