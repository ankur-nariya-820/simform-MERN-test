import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Page from "./pages";
import { theme } from "./constants/theme";
import ToastContainer from "./components/Toast";
import Interceptor from './services/interceptor';
import { Provider } from "react-redux";
import store from "./store";
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Interceptor />
        <ToastContainer />
        <Page />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
