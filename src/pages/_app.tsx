import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <main className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
