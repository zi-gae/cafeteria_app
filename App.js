import React, { Component } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore";
import AppContainer from "./components/AppCotainer";

const { persistor, store } = configureStore();

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false
    };
  }

  loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/logo.png"),
        require("./assets/images/noProfile.png"),
        require("./assets/images/tu_logo.png"),
        require("./assets/images/icon.png"),
        require("./assets/images/splash.png")
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })
    ]);
  };
  handleLoadingError = err => {
    console.log(err);
  };
  handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true
    });
  };

  render() {
    const { loadAssetsAsync, handleFinishLoading, handleLoadingError } = this;

    const { isLoadingComplete } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={loadAssetsAsync}
          onError={handleLoadingError}
          onFinish={handleFinishLoading}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
