import { type AppType } from "next/app";

import "../styles/globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { Inter as FontSans } from "@next/font/google";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "../components/Toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
      <Toaster />
    </>
  );
};

export default MyApp;
