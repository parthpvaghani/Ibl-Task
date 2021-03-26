import React, { Component } from "react";
import axios from "axios";
import { urls } from "./base-urls";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      message: "",
      chosenTopic: "",
      topicname: "",
      topics: [],
      posts:[]
    };
  }

  fetchTopicInArr = () => {
    let token = localStorage.getItem("token");
    axios
      .post(`${urls.serverUrl}topic/fetchtopics`, {
        token: token,
      })
      .then((res) => {
        console.log("topic arr", res);
        this.setState({
          topics: res.data,
        });
      })
      .catch((err) => {
        console.log("failure", err);
        // alert(err.response.data.msg)
      });
  };

  fetchPostsInArr = () => {
    let token = localStorage.getItem("token");
    axios
      .post(`${urls.serverUrl}post/fetchposts`, {
        token: token,
      })
      .then((res) => {
        console.log("post arr", res);
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log("failure", err);
        // alert(err.response.data.msg)
      });
  };

  componentDidMount() {
    this.fetchTopicInArr();
    this.fetchPostsInArr();
  }

  addPost = () => {
    const { title, message, chosenTopic } = this.state;
    if (!title || !message || !chosenTopic) {
      alert("please enter all the required data");
    } else {
      let token = localStorage.getItem("token");
      axios
        .post(`${urls.serverUrl}post/addpost`, {
          token: token,
          title: title,
          message: message,
          topic: chosenTopic,
        })
        .then((res) => {
          console.log("success", res);
            this.fetchPostsInArr();

        })
        .catch((err) => {
          console.log("failure", err);
          // alert(err.response.data.msg)
        });
    }
  };

  addTopic = () => {
    if (!this.state.topicname) {
      alert("please enter topicname");
    } else {
      let token = localStorage.getItem("token");
      axios
        .post(`${urls.serverUrl}topic/addtopic`, {
          token: token,
          topicName: this.state.topicname,
        })
        .then((res) => {
          console.log("success", res);
          this.fetchTopicInArr();
        })
        .catch((err) => {
          console.log("failure", err);
          // alert(err.response.data.msg)
        });
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  logOut = () => {
      localStorage.clear()
      window.location.href='/'
  }
  render() {
    return (
        <div>
                <button onClick={this.logOut}  style={{float:'right',margin:'10px'}}>Logout</button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "50px",
          padding:'50px',
          backgroundColor:'lightsalmon',
          boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',transition:'0.3s',borderRadius:'9px'
        }}
      >
        <div style={{ display: "flex", flexDirection: "column",margin:'4px' }}>
          <label for="cars" style={{ textAlign: "center" }}>
            Enter Post Title
          </label>

          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            style={{ margin: "5px" }}
          />
          <label for="cars" style={{ textAlign: "center" }}>
            Enter Post Message
          </label>

          <input
            type="text"
            name="message"
            onChange={this.handleChange}
            style={{ margin: "5px" }}
          />
          <label for="cars" style={{ textAlign: "center" }}>
            Select Your Topic Name
          </label>

          <select
            name="chosenTopic"
            id="chosenTopic"
            value={this.state.chosenTopic}
            onChange={this.handleChange}
            style={{ margin: "5px" }}
          >
            {this.state.topics.map((topic) => {
              <option value="">None</option>;
              return <option value={topic}>{topic}</option>;
            })}
          </select>
          <button onClick={this.addPost} style={{ margin: "5px" }}>
            Add Post
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="cars" style={{ textAlign: "center" }}>
            Enter Topic Name
          </label>
          <input
            type="text"
            name="topicname"
            onChange={this.handleChange}
            style={{ margin: "5px" }}
          />
          <button onClick={this.addTopic} style={{ margin: "5px" }}>
            Add Topic
          </button>
        </div>
      </div>
      <div className="post__store" style={{margin:'50px'}}>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
      {
          this.state.posts.map((post,index)=>{
              return(
                  <div style={{margin:'10px',boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',transition:'0.3s',borderRadius:'9px'}}>
                  <div style={{width:'100px',margin:'5px',padding:'10px',backgroundColor:'ActiveCaption',display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',borderRadius:'9px'}}>
                  <label>Title :</label>
                  <p key={index}>{post.title}</p>
                  <label>Message :</label>
                  <p key={index}>{post.message}</p>
                  </div>
                  </div>
              )
          })
      }
        </div>
      </div>
      </div>
    );
  }
}
