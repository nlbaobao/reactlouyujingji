import { createStore, AnyAction, combineReducers } from "redux";
import { UserInfo } from "./interfaces/model";

interface StoreType {
  readonly menu: string;
  readonly user: UserInfo;
}

let menu = (state: string = "signal", action: AnyAction): string => {
  switch (action.type) {
    case "SET_MENU":
      return action.menu;
    default:
      return state;
  }
};
let user = (state: UserInfo = {}, action: AnyAction): UserInfo => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return state;
  }
};

let reducer = combineReducers<StoreType>({
  menu,
  user
});

export default createStore<StoreType>(reducer);
