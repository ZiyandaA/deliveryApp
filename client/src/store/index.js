import {applyMiddleware, createStore} from "redux";
import reducer from "./modules/rootReducer";
import jwt from 'jsonwebtoken';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import setAuthorizationToken from '../helper/setAuthorizationToken';
import { loginAction } from '../store/modules/auth';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.accessToken) {
    const { accessToken } = localStorage;
    setAuthorizationToken(accessToken);
    store.dispatch(loginAction(jwt.decode(accessToken)));
  }

export default store;
