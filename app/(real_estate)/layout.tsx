"use client"

import Navbar from "@/components/Navbar";
import "../globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Provider from "@/context/Provider";
import ReduxProvider from "../store/ReduxProvider";

// export const metadata: Metadata = {
//   title: "EstateVision",
//   description: "Real Estate management system",
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body className=" flex flex-col ">
        <ReduxProvider>

          <Provider>
            <div className="min-h-screen mt-28 sm:mt-16 bg-white">{children}</div>
            <Navbar />
            <Footer />
          </Provider>

        </ReduxProvider>

      </body>

    </html>
  );
};

export default RootLayout;

export const Here = () => { };
