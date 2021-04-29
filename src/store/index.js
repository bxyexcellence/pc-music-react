import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import cReducer from "./reducer";

//让插件能监听
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(cReducer,composeEnhancers(applyMiddleware(thunk)))


export default store


