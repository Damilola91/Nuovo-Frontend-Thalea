import "./globals.css";
import "../i18n";

import ReduxProvider from "../components/ReduxProvider/ReduxProvider";
import { Toaster } from "react-hot-toast";
import CookiesPreferences from "../components/CookiesPreferences/CookiesPreferences";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <CookiesPreferences />
        </ReduxProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
