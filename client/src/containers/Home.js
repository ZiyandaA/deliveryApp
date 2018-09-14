import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../store/modules/auth'
import FormComponent from '../components/FormComponent'
import Header from './Header';
import logo from './assets/logo2.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

    }
    logOut() {
        console.log(this.props.history.replace)
        return axios.post("/users/logout")
            .then(data => {
                this.props.changeLoginStatus();
                this.props.history.push("/login");
                console.log(data)
            })
    }


    render() {
        const { mode, orderId } = queryString.parse(this.props.location.search)
        const formProps = mode === 'edit' ? { mode, orderId }: { mode: 'create'};
        // if there is a user logged in, then he/she should automatically show the form
        // rather than the landing components you might find below
        if(this.props.loggedIn) {
        return(
            <div>
                {/* <div className="home" style={{fontSize: 30, color: 'white'}}>Home</div> */}
                <FormComponent {...formProps}/>
                <p>
                </p>
            </div>
        )
    }
        return(
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
                <HeaderComponent history={this.props.history} />
                <BannerComponent />
                <SecondBannerComponent   history={this.props.history} />
                <FooterComponent />
            </div>
        )
    }
}

// you might want to refactor the components below since they are core logic distracting
// and might be out of place
/**
 * @name BannerComponent
 * @description This is the main banner that is displaed on the landing page
 * @returns {function} React Component
 */
const BannerComponent = () => (
    <div style={{
        display: 'flex',
        height: '400px',
        width: '100%',
        position: 'relative'
    }}>
    <img alt="banner" src="https://images.unsplash.com/photo-1527577891194-fd38429946bb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=52610a594dfea47fd2955e97b99a51b1&auto=format&fit=crop&w=800&q=60"  style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover'}}/>
    <div style={{ backgroundColor: '#2C2B2B90', height: '100%', width: '100%', zIndex: 3, positon: 'absolute', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p className="home-image" style={{ color: 'white', fontSize: '24px', fontWeight: '600', textAlign: 'center', width: '25%'  }}>
            <img
                src="/static/media/logo2.8e237bde.jpg" height="170px"
            />
            <span className="my-text-center my-text-white home-msg"> Messenger Pricing System</span>
        </p>
    </div>
    </div>
)

/**
* @name SecondBannerComponent
 * @description This contains the grid, the once with the login and sign up buttons
 * @returns {function} React Component
 */
const SecondBannerComponent = ({ history }) => (
    <div
        style={{
            height: '450px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            backgroundColor: 'white'
        }}
    >
        <div id="home-text" style={{ display: 'flex', width: '50%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{ color: 'black', textAlign: 'center', width: '50%', fontSize: '18px', fontWeight: 'bold', fontFamily: 'Playfair Display' }}> We provide a delivery Price quote that is fast and secure. We believe in enabling a future where delivery is almost as quick as you thinking about it, and it all starts with a quote. Log in to get yours. </p>
        </div>
        <div style={{ height: '100%', width: '50%', position: 'relative' }}>
            <img  alt="banner" src="https://images.unsplash.com/photo-1522074534099-45b66be3f193?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1120af654449ab8c8e2247989f0bff2f&auto=format&fit=crop&w=800&q=60" style={{ objectFit: 'cover', width: '100%',  position: 'absolute', top: 0, height: '100%' }}/>
            { /* overlay */}
            <div style={{ backgroundColor: '#09090990', height: '100%', width: '100%', zIndex: 19, position: 'absolute', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <div className="hoverable-button"  onClick={() => history.push('/login')} style={{ color: 'white',  backgroundColor: '#003459', height: '50px', width: '120px', marginRight: '10px', borderRadius: '5px', textAlign: 'center', paddingTop: '13px', fontSize: '14px'}}> Login </div>
                <div  className="hoverable-button" onClick={() => history.push('/register')} style={{ color: 'white',  backgroundColor: 'green', height: '50px', width: '120px', borderRadius: '5px', textAlign: 'center', paddingTop: '13px', fontSize: '14px'  }}> Sign Up </div>
            </div>
        { /* end of overlay */}
        </div>
    </div>
)

/**
 * @name FooterComponent
 * @description The footer. You can export this and use it anwhere you like in the application
 * @returns {function} React Component
 */
const FooterComponent = () => (
    <div style={{ height: '60px', width: '100%', backgroundColor: '#4D5656', paddingTop: '10px'}}>
        <p style={{ color: 'black', textAlign: 'center', color: 'white', fontFamily: 'Playfair Display' }}> Designed by Ziyanda Ayd  </p>
    </div>
)
/**
 * @name HeaderComponent
 * @description The Header. This is also very reusable, so feel free to use anywhere in the application
 * @returns {function} React Component
 */
const HeaderComponent = () => (
    <div style={{  height: '60px', paddingLeft: '20px', paddingTop: '15px',  width: '100%', backgroundColor: '#003459'}}>
        <img alt="logo" src={logo} style={{ float: 'left', height: '70px', width: '100px', position: 'relative', top: '-10px'  }}/>
        <p style={{ color: 'white', textAlign: 'center',  }}></p>
    </div>
)



export default connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        state: state
    }),
    dispatch => ({
        changeLoginStatus: () => {
            dispatch(loginAction());
        }
    })
)(Home);