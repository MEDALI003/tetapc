import { basketReducer } from "./reducer/basketReducer";
import { productReducer } from "./reducer/productReducer";
import userReducer from "./reducer/reducer";
import { combineReducers } from 'redux';





 const rootReducer=combineReducers({user:userReducer,product:productReducer,basket:basketReducer})
 export default rootReducer