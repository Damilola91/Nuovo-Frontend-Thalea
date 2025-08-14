import "./globals.css";

import ReduxProvider from "../components/ReduxProvider/ReduxProvider";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
