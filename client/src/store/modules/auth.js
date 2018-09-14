import setAuthorizationToken from '../../helper/setAuthorizationToken';

export const LOGIN_CHANGE  = 'LOGIN_CHANGE';

export function loginAction(user) {
    return {
        type: LOGIN_CHANGE,
        user
    }
}

export const logoutAction = () => (dispatch) => {
    setAuthorizationToken(false);
    localStorage.removeItem('accessToken');
    return dispatch(loginAction({}));
};

export function authReducer(state={
    loggedIn: false,
    user: {}
}, action) {
    switch (action.type) {
        case LOGIN_CHANGE: {
            return {
                ...state,
                loggedIn: !state.loggedIn,
                user: action.user
            }
        }
        default: return state;
    }
}
