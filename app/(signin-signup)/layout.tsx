"use client"
import "../globals.css";
import type { Metadata } from "next";
import ReduxProvider from "../store/ReduxProvider";

// export const metadata: Metadata = {
//   title: "EstateVision",
//   description: "Real Estate management system",
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">

      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const Here = () => { };
