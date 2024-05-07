import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../Redux/store";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";
function MyApp({ pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
