

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";
import io from 'socket.io-client';


const socket = io('https://final-xxdh.onrender.com'); 

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.getUserProfile = this.getUserProfile.bind(this);
        //this.fetchTotalRequests = this.fetchTotalRequests.bind(this);
        // If you have 'someMethod', bind it here as well, e.g.,
        // this.someMethod = this.someMethod.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            currentProfile: {
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                phone_no: "",
                address: "",
                department: ""
                
            },
            showStudentBoard: "User",
            showAcademicBoard: "User",
            showNonacBoard: "User",
        
            totalRequests: 0,
            pendingRequests: 0,
            issuedRequests: 0,
            totalItems: 0,
            outOfStockItems: 0,
            deliveredItems: 0,
            totalUsers: 0,       
            role2Users: 0,        
            role3Users: 0 
        };
    }

  
    
    componentDidMount() {
      socket.on('dashboard-data', (data) => {
        this.setState({
          totalRequests: data.totalRequests,
          pendingRequests: data.pendingRequests,
          issuedRequests: data.issuedRequests,
          totalItems: data.totalItems,
          outOfStockItems: data.outOfStockItems,
          deliveredItems: data.deliveredItems,
          totalUsers: data.totalUsers,        
          role2Users: data.role2Users,        
          role3Users: data.role3Users  
        });
      });
        // Since you are directly accessing `this.state.currentUser.roles` below, ensure currentUser is not null
        if (this.state.currentUser && Array.isArray(this.state.currentUser.roles)) {
            this.setState({
                showStudentBoard: this.state.currentUser.roles.includes("ROLE_STUDENT"),
                showAcademicBoard: this.state.currentUser.roles.includes("ROLE_ACADEMIC"),
                showNonacBoard: this.state.currentUser.roles.includes("ROLE_NON-ACADEMIC"),
                showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN")
            });
        }
        console.log(this.state.currentUser);
    }
    componentWillUnmount() {
      socket.disconnect();
    }

    getUserProfile(username) {
        ProfileService.get(username)
            .then(response => {
                this.setState({
                    currentProfile: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    // Implement 'someMethod' here if needed

    render() {
        const { showStudentBoard, showAcademicBoard, showNonacBoard, showAdminBoard, currentProfile, totalRequests, pendingRequests, issuedRequests, totalItems, outOfStockItems, deliveredItems,totalUsers,role2Users,role3Users} = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    {/* main */}
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    <div className="card-body">
                                        <div className="mb-4">
                                            <h3 className="card-title display-4">Welcome <span className="text-primary">{currentProfile.first_name + "!"}</span></h3>
                                            <p className="card-text">This is your dashboard.</p>
                                        </div>
                                        <hr />
                                        <div className="my-4">
                                            {showStudentBoard &&
                                                <div className="row">
                                                    <div className="col-12 col-sm-4 mb-3">
                                                        <div className="card" style={{ 'borderColor': '#685CD6', 'height': '100%' }}>
                                                            <div className="card-body" style={{ 'color': '#685CD6' }}>
                                                                <div className="card-title">
                                                                    <div className="row">
                                                                        <div className="col-5 col-sm-12 col-lg-5">
                                                                            <i className="fas fa-border-all fa-5x"></i>
                                                                        </div>
                                                                        <div className="col-7 col-sm-12 col-lg-7">
                                                                            <h4 className="display-4">{totalRequests}</h4>
                                                                            <p className="text-muted"> Total Requests</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <a href="#" className="btn btn-outline-info btn-sm">View More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4 mb-3">
                                                        <div className="card" style={{ 'borderColor': '#C00C84', 'height': '100%' }}>
                                                            <div className="card-body" style={{ 'color': '#C00C84' }}>
                                                                <div className="card-title">
                                                                    <div className="row">
                                                                        <div className="col-5 col-sm-12 col-lg-5">
                                                                            <i className="fas fa-circle-notch fa-5x"></i>
                                                                        </div>
                                                                        <div className="col-7 col-sm-12 col-lg-7">
                                                                            <h4 className="display-4">1</h4>
                                                                            <p className="text-muted"> Pending Requests</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <a href="#" className="btn btn-outline-danger btn-sm">View More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4 mb-3">
                                                        <div className="card" style={{ 'borderColor': '#2F84B1', 'height': '100%' }}>
                                                            <div className="card-body" style={{ 'color': '#2F84B1' }}>
                                                                <div className="card-title">
                                                                    <div className="row">
                                                                        <div className="col-5 col-sm-12 col-lg-5">
                                                                            <i className="fas fa-check fa-5x"></i>
                                                                        </div>
                                                                        <div className="col-7 col-sm-12 col-lg-7">
                                                                            <h4 className="display-4">3</h4>
                                                                            <p className="text-muted"> Reviewed Requests</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <a href="#" className="btn btn-outline-secondary btn-sm">View More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {showAcademicBoard &&
                                                <div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#685CD6', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#685CD6' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-border-all fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{totalRequests}</h4>
                                                                                <p className="text-muted"> Total Requests</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-info btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#C00C84', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#C00C84' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-circle-notch fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{pendingRequests}</h4>
                                                                                <p className="text-muted"> Pending Requests</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-danger btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#2F84B1', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#2F84B1' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-check fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{issuedRequests}</h4>
                                                                                <p className="text-muted"> Issued Requests</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-secondary btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#150578', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#150578' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-user-graduate fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{totalItems}</h4>
                                                                                <p className="text-muted"> Total Items</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-info btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#F55F14', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#F55F14' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-spinner fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{outOfStockItems}</h4>
                                                                                <p className="text-muted">Out of Stock Item</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-danger btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#2FC64A', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#2FC64A' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-check-circle fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{deliveredItems}</h4>
                                                                                <p className="text-muted">Delivered Items</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-success btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {showNonacBoard &&
                                                <div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#685CD6', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#685CD6' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-border-all fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{totalRequests}</h4>
                                                                                <p className="text-muted"> Total Requests</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-info btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#F7B32B', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#F7B32B' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-circle-notch fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{pendingRequests}</h4>
                                                                                <p className="text-muted"> Pendding Requests</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-warning btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#2F84B1', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#2F84B1' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="far fa-check-square fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{issuedRequests}</h4>
                                                                                <p className="text-muted"> Issued Requests</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-primary btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#CA2E55', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#CA2E55' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-book-reader fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{totalItems}</h4>
                                                                                <p className="text-muted"> Total Items</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-danger btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#7D5BA6', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#7D5BA6' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-user-graduate fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{outOfStockItems}</h4>
                                                                                <p className="text-muted"> Out-of-stock Items</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-info btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#E26A50', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#E26A50' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-exclamation fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{deliveredItems}</h4>
                                                                                <p className="text-muted"> Delivered Items</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-danger btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {showAdminBoard &&
                                                <div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#730071', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#730071' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-users fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{totalUsers}</h4>
                                                                                <p className="text-muted"> Total Users</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-primary btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#FF8B1F', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#FF8B1F' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-users-cog fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{role2Users}</h4>
                                                                                <p className="text-muted"> Total Manufracturer</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-warning btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-12 col-sm-4 mb-3">
                                                            <div className="card" style={{ 'borderColor': '#3943B7', 'height': '100%' }}>
                                                                <div className="card-body" style={{ 'color': '#3943B7' }}>
                                                                    <div className="card-title">
                                                                        <div className="row">
                                                                            <div className="col-5 col-sm-12 col-lg-5">
                                                                                <i className="fas fa-user-tag fa-5x"></i>
                                                                            </div>
                                                                            <div className="col-7 col-sm-12 col-lg-7">
                                                                                <h4 className="display-4">{role3Users}</h4>
                                                                                <p className="text-muted"> Total Distributor</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <a href="#" className="btn btn-outline-primary btn-sm">View More</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <hr />
                                        <div className="my-4">
                                            {/*showStudentBoard &&
                                                <div>
                                                    <h4 className="card-title text-danger">Special Student Notices</h4>
                                                    <div className="list-group">
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Et magnis dis parturient montes</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                            <small>Donec Porta.</small>
                                                        </div>
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Enim eu turpis egestas pretium aenean pharetra</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor massa id neque.</p>
                                                            <small>Elit Non.</small>
                                                        </div>
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Dictum sit amet justo donec enim diam</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Enim eu turpis egestas pretium aenean pharetra magna.</p>
                                                            <small>Non Mipo.</small>
                                                        </div>
                                                    </div>
                                        </div>*/}
                                            {/*showAcademicBoard &&
                                                <div>
                                                    <h4 className="card-title text-danger">Special Academic Staff Notices</h4>
                                                    <div className="list-group">
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Et magnis dis parturient montes</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                            <small>Donec Porta.</small>
                                                        </div>
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Enim eu turpis egestas pretium aenean pharetra</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor massa id neque.</p>
                                                            <small>Elit Non.</small>
                                                        </div>
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Dictum sit amet justo donec enim diam</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Enim eu turpis egestas pretium aenean pharetra magna.</p>
                                                            <small>Non Mipo.</small>
                                                        </div>
                                                    </div>
                                            </div>*/}
                                            {/*showNonacBoard &&
                                                <div>
                                                    <h4 className="card-title text-danger">Special Non-Academic Staff Notices</h4>
                                                    <div className="list-group">
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Et magnis dis parturient montes</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                            <small>Donec Porta.</small>
                                                        </div>
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Enim eu turpis egestas pretium aenean pharetra</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor massa id neque.</p>
                                                            <small>Elit Non.</small>
                                                        </div>
                                                        <div className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Dictum sit amet justo donec enim diam</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Enim eu turpis egestas pretium aenean pharetra magna.</p>
                                                            <small>Non Mipo.</small>
                                                        </div>
                                                    </div>
                                            </div>*/}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}