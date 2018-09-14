/* eslint no-unused-vars: 0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Signin extends Component {

    render() {
        let {handleChange, handleSubmit, mode, isLoading} = this.props;
        console.log(isLoading)
        return(
            <div id="authContainer" className="primary-bg-color">
                <div className="myContainer">
                    {mode && mode === 'login' &&
                        <h4 className="">Sign In to Access Your Account</h4>
                    }
                    {mode && mode === 'register' &&
                        <h4 className="">Sign Up and Join the Train</h4>
                    }
                    <br />
                    <div className="authenticationBox">
                        <div className="first-box white-bg-color">
                            <div className="">
                                <div className="leftSide">
                                    {mode && mode === 'login' &&
                                        <h5 className="title">SIGN IN</h5>
                                    }
                                    {mode && mode === 'register' &&
                                        <h5 className="title">SIGN UP</h5>
                                    }
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit(mode)
                                        }}
                                    >
                                        <div className="my-form-group">
                                            <label htmlFor="usernameInput">Username</label>
                                            <input   onChange={handleChange} name="name" type="text" className="my-form-control" id="usernameInput" placeholder="Enter username" />
                                        </div>
                                        <div className="my-form-group">
                                            <label htmlFor="passwordInput">Password</label>
                                            <input type="password" onChange={handleChange} name="password" className="my-form-control" id="passwordInput" placeholder="Password" />
                                        </div>
                                        {mode && mode === 'login' &&
                                            <button type="submit" className="my-button" disabled={isLoading}>Sign in</button>
                                        }
                                        {mode && mode === 'register' &&
                                            <button type="submit" className="my-button" disabled={isLoading}>Sign up</button>
                                        }
                                    </form>
                                    <br />
                                    {mode && mode === 'login' &&
                                    <Link to="register" className="my-text-center" href="#"> Dont have an account ? Sign up</Link>
                                    }
                                    {mode && mode === 'register' &&
                                    <Link to="login" className="my-text-center" href="#">Have an account ? Sign in</Link>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="secondary-bg-color rightSide">
                            <h1 className="my-text-center my-text-white logo-text ">ARC</h1>
                            <p className="my-text-center my-text-white">The Messenger Pricing System</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;
// onClick={handleSubmit}
