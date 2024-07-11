import { combineReducers } from "redux";

import loaderReducer from "./loader/reducer/reducer";
import userReducer from "./user/reducer/reducer";
import toastReducer from "./toast/reducer/toast";
// import boxReducer, { BoxOverlayReducer } from "./box/reducer/reducer";
// import LatLngReducer from "./LatLng/reducer/reducer";
// import MapReducer from "./map/reducer/reducer";
// import ModalReducer, { TabReducer } from "./modal/reducer/reducer";
// import SidePanelReducer from "./sidePanel/reducer/reducer";
// import CartReducer from "./cart/reducer/reducer";
// import ScrollEndReducer from "./scrollEnd/reducer/reducer";
// import CreatePostReducer from "./createPost/reducer/reducer";

const reducers = combineReducers({
  user: userReducer,
  toast: toastReducer,
  loader: loaderReducer,
  // box: boxReducer,
  // boxOverlay: BoxOverlayReducer,
  // latLng: LatLngReducer,
  // mapReducer: MapReducer,
  // modalReducer: ModalReducer,
  // tabReaducer: TabReducer,
  // sidePanelReducer: SidePanelReducer,
  // cartReducer: CartReducer,
  // scrollEndReducer: ScrollEndReducer,
  // createPostReducer: CreatePostReducer,
});
export default reducers;
export type State = ReturnType<typeof reducers>;
