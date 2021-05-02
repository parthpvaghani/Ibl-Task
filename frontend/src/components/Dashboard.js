/* eslint-disable  */
import React, { useState, useEffect } from "react";
import AlertDialog from "./AlertDialog";
import { makeStyles } from "@material-ui/core";
// import StallMainTopbar from "./StallMainTopbar";
// import StallMainSidebar from "./StallMainSidebar";
import MainPanel from './MainPanel'
import DashboardTopbar from './DashboardTopbar'
import DashboardSidebar from './DashboardSidebar'
import "../dashboard.css";
import axios from 'axios';
import {urls} from './base-urls'
class Dashboard extends React.Component {
//   static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isMobileNavOpen: false,
      pageName: "Music Panel",
      authStateSpin: false,
      alertDialog: {
        isOpen: false,
        title: "",
        subTitle: ""
      },
    }
  }
  componentDidMount() {
    
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

  setAlertDialogfunc = () => {
    this.setState({
      alertDialog: {
        isOpen: false,
        title: "",
        subTitle: ""
      }
    })

  };

  sideOptionSelected = (pageNameToLoad) => {
    this.setState({
      pageName: pageNameToLoad
    });
  }

  render() {
    const pageName = this.state.pageName

    return (
      <div>
        
            <div>
              <div style={{ backgroundColor: "" }, { display: "flex" }, { height: 100 + '%' }, { overflow: "hidden" }, { width: 100 + '%' }}>
                <DashboardTopbar
                  onMobileNavOpen={() => this.setState({
                    isMobileNavOpen: true
                  })}
                  sideOptionSelected={(value) => { this.sideOptionSelected(value) }}
                />
                <DashboardSidebar
                  sideOptionSelected={(value) => this.sideOptionSelected(value)}
                  onMobileClose={() => this.setState({ isMobileNavOpen: false })}
                  openMobile={this.state.isMobileNavOpen}
                />
                <div className="margintopleft">
                  <div>
                    {this.state.pageName === "Music Panel" && <MainPanel/>}
                 </div>
                </div>
              </div>


              <AlertDialog
                alertDialog={this.state.alertDialog}
                setAlertDialog={this.setAlertDialogfunc}
              />
            </div>

      </div>
    );


  }
}

export default Dashboard;
