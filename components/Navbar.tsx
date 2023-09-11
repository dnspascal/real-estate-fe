"use client";
import React, { useEffect, useState } from "react";
import { navbar_items } from "@/constants";
import Link from "next/link";
import {
  HomeWork,
  PersonOutline,
  Search,
  Logout,
  Person,
  Menu,
} from "@mui/icons-material";
import {  CircularProgress, Dialog, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import Popup from "reactjs-popup";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import NProgress from "nprogress"
import "nprogress/nprogress.css";
import { usePathname } from "next/navigation";
import { DialogBody, DialogFooter, DialogHeader,Button } from "@material-tailwind/react";

NProgress.configure({showSpinner:false});



const Navbar = () => {
  const _system_name = navbar_items[0]._name;
  const [sidebar, setSidebar] = useState(false);
  const {status, data: session } = useSession();
  const pathname = usePathname()
  const [open,setOpen] = useState(false)

  const handleOpen = ()=>{
    setOpen(!open)
  }
  

  useEffect(()=>{
  {status === 'loading'?

  NProgress.start():
  NProgress.done()
} 
  
  },[pathname,status])
  console.log(status)
  return (
    <>
      <div className="md:flex hidden justify-around h-16 items-center p-4 bg-white z-50 border-b border-black fixed top-0 left-0 w-screen">

        {navbar_items.map((item, index) => (
          <Link
            className={
              item._name == "EstateVision"
                ? "text-xl hover:opacity-30"
                : "hover:opacity-30"
            }
            key={index}
            href={item.path}
          >
            {item._name}
          </Link>
        ))}
        <div>
          <FormControl size="small">
            <OutlinedInput
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Default outline color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Outline color on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Outline color when focused
                },
              }}
              placeholder="Search properties here"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="flex items-center gap-2">
        

        { status === 'loading' ? <CircularProgress/> : session?.user ?  <>
        <span>Welcome, {session?.user?.name}</span>
        
       
        <Popup
          trigger={
            <div className=" cursor-pointer ">
             
                
                 
                 <Image
                  src={`http://localhost:8000${session?.user?.image}`}
                  alt="profile_picture"
                  width={50}
                  height={50}
                  className="object-cover rounded-full w-14 h-14 "
                />
               
                
              
            </div>
          }
          position="bottom center"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{
            paddingTop: "5px",
            border: "none",
            position: "fixed",
            top: "0px",
          }}
          arrow={false}
        >
          <div className="border rounded-md py-2 px-4 z-10 bg-white flex flex-col gap-y-3 ]">
            <div className="cursor-pointer hover:opacity-30 flex items-center gap-x-3 text-sm">
              <HomeWork />
              My Properties
            </div>
            <div className="cursor-pointer hover:opacity-30 flex items-center gap-x-3 text-sm">
              <Person /> My Account
            </div>
            <div
              onClick={handleOpen}
              className="cursor-pointer hover:opacity-30 flex items-center gap-x-3 text-sm"
            >
              <Logout />
              Logout
            </div>
          </div>
        </Popup>
        </>
          :
          <div className="flex gap-x-2">

          <span className="bg-blue-900 rounded text-white px-4 py-1">Sign in</span>
          
          {/* <span className="bg-blue-900 rounded text-white px-4 py-1">Sign up</span> */}
       </div>
           }
          
       
        </div>
      </div>

      {/* Navbar for small device */}

      <div className="flex flex-col bg-white fixed top-0 z-50 md:hidden w-full px-2 py-4 gap-y-2 h-28 border-b border-black">
        <span className="text-center w-full text-xl">{_system_name}</span>
        <div className="flex justify-between w-full items-center ">
          <div>
            <Menu
              onClick={() => {
                setSidebar(true);
              }}
            />
          </div>
          <FormControl size="small">
            <OutlinedInput
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Default outline color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Outline color on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Outline color when focused
                },
              }}
              placeholder="Search properties here"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>

      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <Dialog  open={open} onClick={handleOpen} 
      
      >
        <DialogBody divider>
          Are you sure you want to signout of EsateVision
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
           
          >
            <span>Cancel</span>
          </Button>
          <Button onClickCapture={async() => {await signOut({ callbackUrl: "/signin" });handleOpen}} variant="gradient" color="green" >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Navbar;
