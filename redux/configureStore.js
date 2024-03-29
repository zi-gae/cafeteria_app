import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./modules/user";
import posts from "./modules/posts";
import crawlers from "./modules/crawlers";

const middlewares = [thunk];

const persistConfig = {
  key: "root",
  blacklist: ["crawlers"],
  storage
};

const reducer = persistCombineReducers(persistConfig, {
  user,
  posts,
  crawlers
});

const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
