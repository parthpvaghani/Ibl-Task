import React, { Component } from 'react'
import axios from 'axios';
import {urls} from './base-urls'
import Topic from './Topic';
import Post from './Post';

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    logOut = () =>{
        localStorage.clear()
        window.location.href = '/'
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        axios.post(`${urls.serverUrl}auth/validateuser`,{
            token:token
        }).then(res=>{
            console.log('success',res)
        }).catch(err=>{
            console.log('failure',err)
            localStorage.clear();
            window.location.href='/'
        })

    }
    
    render() {
        return (
            <div>
                <Post/>
            </div>
        )
    }
}
