/* eslint-disable  */
import React, { useState, useEffect } from "react";
import MainPanel from './MainPanel'
import DashboardTopbar from './DashboardTopbar'
import DashboardSidebar from './DashboardSidebar'
import "../dashboard.css";
import axios from 'axios';
import { urls } from './base-urls'
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileNavOpen: false,
            pageName: "Music Panel",
            authStateSpin: false,
        }
    }
    componentDidMount() {

        let token = localStorage.getItem('token');
        axios.post(`${urls.serverUrl}auth/validateuser`, {
            token: token
        }).then(res => {
            console.log('success', res)
        }).catch(err => {
            console.log('failure', err)
            localStorage.clear();
            window.location.href = '/'
        })


    }

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
                                {this.state.pageName === "Music Panel" && <MainPanel />}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );


    }
}

export default Dashboard;
