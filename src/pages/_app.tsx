import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../Redux/store";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default MyApp;
