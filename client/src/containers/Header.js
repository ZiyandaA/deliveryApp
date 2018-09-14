import React, { Component } from 'react';
import toast from 'toastr';
import {connect} from 'react-redux';
import { logoutAction } from '../store/modules/auth'
import { withRouter, Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        // axios.post("/users/logout")
        //     .then(data => {
        //         this.props.changeLoginStatus();
        //         this.props.history.push("/login");

        //         console.log(data)
        //     })
        this.props.logoutUser();
        toast.success('Logout successful');
    }
    renderAuthButtons() {
        return (
            <div>
                <button onClick={() => this.props.history.push('/')} className="logout-btn my-button" style={{float: 'left', fontSize:'15px'}}>Welcome</button>
                <button onClick={this.logOut} className="logout-btn my-button" style={{float: 'right', fontSize:'15px'}}>logout</button>
            </div>
        );
        // if (this.props.loggedIn) {
        //     return (
        //         <div>
        //             <button onClick={() => this.props.history.push('/')} className="logout-btn my-button" style={{float: 'left', fontSize:'15px'}}>Home</button>
        //             <button onClick={this.logOut} className="logout-btn my-button" style={{float: 'right', fontSize:'15px'}}>logout</button>
        //         </div>
        //     );
        // }
        // else {
        //     return <div><Link to="/login">login</Link>, <Link to="/register">register</Link></div>
        // }
    }
    render() {
        const { loggedIn } = this.props;
        return(
            <div className="logout">
                { this.props.loggedIn ?
                    this.renderAuthButtons() : null}
            </div>
        )
    }

}

export default withRouter(connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        state: state
    }),
    dispatch => ({
        logoutUser: () => {
            dispatch(logoutAction());
        }
    })
)(Header));

