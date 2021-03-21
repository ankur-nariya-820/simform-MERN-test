import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const itemName = 'text'
let middleWares = [thunk];

function saveToLocalStorage(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(itemName, serializedState);
  } catch (err) {
    console.log("Error:", err);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem(itemName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("Error:", err);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middleWares),
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
