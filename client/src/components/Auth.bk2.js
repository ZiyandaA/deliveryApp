/* eslint no-unused-vars: 0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Signin extends Component {

    render() {
        let {password, name, handleChange, handleSubmit, successMessage, label, mode} = this.props;
        return(
            <div id="authContainer" className="primary-bg-color row align-items-center">
                <div className="col-md-12 container">
                    {mode && mode === 'login' &&
                        <h4 className="text-white text-center">Sign In to Access Your Account</h4>
                    }
                    {mode && mode === 'register' &&
                        <h4 className="text-white text-center">Sign Up and Join the Train</h4>
                    }
                    <br />
                    <div className="row authenticationBox">
                        <div className="col-md-5 col-sm-12 col-xs-12 d-block white-bg-color">
                            <div className="row align-items-center">
                            <div className="col-md-12 container leftSide">
                            {mode && mode === 'login' &&
                                <h5 className="text-center">SIGN IN</h5>
                            }
                            {mode && mode === 'register' &&
                                <h5 className="text-center">SIGN UP</h5>
                            }
                                <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit(mode)
                                    }}>
                                    <div class="form-group">
                                        <label for="usernameInput">Username</label>
                                        <input   onChange={handleChange} name="name" type="text" className="form-control" id="usernameInput" placeholder="Enter username" />
                                    </div>
                                    <div className="form-group">
                                        <label for="passwordInput">Password</label>
                                        <input type="password" onChange={handleChange} name="password" className="form-control" id="passwordInput" placeholder="Password" />
                                    </div>
                                    {mode && mode === 'login' &&
                                        <button type="submit" className="btn btn-primary btn-sm text-center">Sign in</button>
                                    }
                                    {mode && mode === 'register' &&
                                        <button type="submit" className="btn btn-primary btn-sm text-center">Sign up</button>
                                    }
                                </form>
                                <br />
                                {mode && mode === 'login' &&
                                <Link to="register" className="text-center" href="#">Have an account ? Sign up</Link>
                                }
                                {mode && mode === 'register' &&
                                <Link to="login" className="text-center" href="#">Have an account ? Sign in</Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 d-none d-md-block secondary-bg-color rightSide">
                        <br /><br /><br /><br />
                        <h1 className="text-center text-white logo-text">ARC</h1>
                        <p className="text-center text-white">The Messenger Pricing System</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;
// onClick={handleSubmit}
