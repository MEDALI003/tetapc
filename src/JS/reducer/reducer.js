import { toast } from "react-toastify";
import { CURRENT, EDIT_PASSWORD, FAIL_USER, LOAD_USER, SIGNIN, LOGOUT, SIGNUP, EDIT_IMAGE } from "../ACTIONS/actions";

const initialState = {
    user: null,
    load: false,
    error: null,
    userFB:null
    
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_USER:
            return { ...state, load: true };
        case SIGNUP:
            toast(payload.msg);
            localStorage.setItem("token", payload.token)
            return { ...state, user:{...payload.newUser}, load: false };
        case SIGNIN:
            toast(payload.msg);
            localStorage.setItem("token", payload.token);
            return { ...state, user: payload.foundUser, load: false };
        case FAIL_USER:
            toast.error("Please verify your email and password.");
            return { ...state, error: payload.data, load: false };
        case EDIT_PASSWORD:
            toast("Password updated.");
            return { ...state, load: false };
        case EDIT_IMAGE:
            toast("Image updated successfully.");
            return { ...state, load: false };
        case LOGOUT:
            toast("Logged out successfully.");
            localStorage.removeItem("token");
            return { ...state, user: null, load: false };
        case CURRENT:
            toast(payload.msg);
            return { ...state, user: payload.foundUser, load: false };

        default:
            return state;
    }
}

export default userReducer;
