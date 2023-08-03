import { Types } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null,
    signUpInfo: null,
};

type ActionType = {
    type: string;
    payload: any;
};

// type UserType = {
//     id: number;
//     type: string;
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     email: string;
//     cell: number;
//     password: string;
//     createdDate: string;
// };

type StateType = {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    user: null;
    signUpInfo: null;
};

const authReducer = (state: StateType = initialState, action: ActionType = { type: '', payload: null }) => {
    switch (action.type) {
        // case Types.USER_LOADED:
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         loading: false,
        //         user: action.payload,
        //         signUpInfo: null,
        //     };
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                loading: false,
                signUpInfo: null,
        };
        case Types.LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                signUpInfo: null,
            };
        case Types.SET_SIGNUP_INFO:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                signUpInfo: action.payload,
            };
        default:
            return state;
    }
}

export default authReducer;
