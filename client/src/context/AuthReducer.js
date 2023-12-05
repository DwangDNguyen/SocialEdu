const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                currentUser: action.payload,
                token: action.payload.token,
            };
        }
        case "LOGOUT": {
            return {
                currentUser: null,
                cart: [],
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
