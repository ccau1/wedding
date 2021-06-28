import { AppProps } from "next/dist/next-server/lib/router/router";
import { appWithTranslation } from "next-i18next";
import { Provider as ReduxProvider } from "react-redux";
import nextI18NextConfig from "../next-i18next.config.js";
// tailwindcss files import, same as @import in global.scss, but
// needs it here for build version
// import "tailwindcss/dist/base.min.css";
// import "tailwindcss/dist/components.min.css";
// import "tailwindcss/dist/utilities.min.css";
import "../styles/global.scss";
import { store } from "../redux/store";
import {
  TailwindThemeContext,
  theme,
} from "../providers/TailwindThemeProvider";
// library setups
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "react-datetime/css/react-datetime.css";
import DeviceManager from "containers/deviceManager";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { getAccessToken } from "lib/auth";
import sockets from "sockets";
ReactModal.setAppElement("#__next");

const App = ({ Component, pageProps }: AppProps) => {
  // HANDLE INITIAL LOAD
  useEffect(() => {
    const accessToken = getAccessToken();
    // if already has token, set to socket now
    if (accessToken) {
      sockets.authenticateAll(accessToken);
    }
  }, []);

  return (
    <TailwindThemeContext.Provider value={theme}>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
        <DeviceManager />
      </ReduxProvider>
    </TailwindThemeContext.Provider>
  );
};

// App.getInitialProps = async (appContext) => {
//   const request = appContext?.ctx?.req;

//   return {
//     // workaround cause getServerSideProps is not possible in _app
//     getReqCookie() {
//       return request?.headers?.cookie;
//     },
//   };
// };

export default appWithTranslation(App, nextI18NextConfig);
