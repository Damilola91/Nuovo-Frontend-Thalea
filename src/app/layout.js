import "./globals.css";
import "../i18n";

import ReduxProvider from "../components/ReduxProvider/ReduxProvider";
import { Toaster } from "react-hot-toast";
import CookiesPreferences from "../components/CookiesPreferences/CookiesPreferences";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Script GA base */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        />

        <script
          id="ga-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Modalità di consenso di default: nessun consenso
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied'
              });

              gtag('config', '${MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
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
