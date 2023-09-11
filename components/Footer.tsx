"use client";
import {
  Email,
  Facebook,
  Instagram,
  Phone,
  SupportAgent,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import { navbar_items } from "@/constants";

const Footer = () => {
  return (
    <div className="bg-[#f7f7f7] py-4 text-black  mt-auto h-full flex flex-col items-center gap-y-2  w-full ">
      <div className="flex md:justify-around   w-4/5 border-b border-black  md:flex-row items-start flex-col pb-5 ">
        <div>
          <p className="font-bold py-3">Support</p>
          <ul className="text-xs">
            <li>Help center</li>
            <li>Resources</li>
            <li className="space-x-1">
              <SupportAgent />
              <span>212-566-2249</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold py-3">About Us</p>
          <ul className="text-xs">
            <li>Terms of use</li>
            <li>Privacy policy</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <p className="font-bold py-3">Contact Us</p>
          <ul className="text-xs">
            <li className="space-x-1">
              <Email />
              <span>Estatevision@gmail.com</span>
            </li>
            <li className="space-x-1">
              <Phone />
              <span>+255752451811</span>
            </li>
            <li className="flex gap-x-2">
              <Facebook fontSize="small" />
              <Instagram fontSize="small" />
              <Twitter fontSize="small" />
              <YouTube fontSize="small" />
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold py-3">Quick Links</p>
          <ul className="text-xs">
            {navbar_items.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>{item._name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-start  w-4/5 py-4 items-center text-xs md:text-md">
        <span>&copy; 2023 EstateVision. All rights reserved</span>
      </div>
    </div>
  );
};

export default Footer;
