/*import "./globals.css";

import { Toaster } from "react-hot-toast";
import CookiesPreferences from "../components/CookiesPreferences/CookiesPreferences";
import GlobalLoader from "../components/GlobalLoader/GlobalLoader";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <GlobalLoader />
        {children}
        <CookiesPreferences />

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

export default RootLayout; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}