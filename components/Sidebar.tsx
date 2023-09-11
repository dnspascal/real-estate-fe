import { navbar_items } from "@/constants";
import { Close, Logout, PersonOutline } from "@mui/icons-material";
import { Modal } from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebar, setSidebar }) => {
  return (
    <Modal open={sidebar} onClose={() => setSidebar(false)}>
      <div className="bg-white flex flex-col h-screen w-3/4 outline-none ">
        <div className="border-b border-gray-700 flex justify-between items-center p-4 basis-1/6">
          <div className="flex flex-col gap-y-2 justify-center items-center ">
            <span className="outline w-10 h-10 rounded-full flex justify-center items-center">
              <PersonOutline />
            </span>
            <p>John Doe</p>
            <div>
              <Logout />
              <span className="px-1">Logout</span>
            </div>
          </div>
          <span className="bg-black rounded-full h-[2rem] w-[2rem] items-center justify-center flex">
            <Close
              sx={{
                color: "white",
              }}
              fontSize="medium"
              onClick={() => {
                setSidebar(false);
              }}
            />
          </span>
        </div>

        <div className="p-4 flex flex-col border-b border-gray-700 basis-3/6 justify-around">
          {navbar_items.map((item, index) => (
            <Link
              href={item.path}
              onClick={() => setSidebar(false)}
              key={index}
            >
              {item._name}
            </Link>
          ))}
        </div>
        <div className="basis-2/6 gap-y-3 flex flex-col p-4">
          <Link href="/my_properties">My Properties</Link>
          <Link href="/my_properties">My Account</Link>
        </div>
      </div>
    </Modal>
  );
};

export default Sidebar;
