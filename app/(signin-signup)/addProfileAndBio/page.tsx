"use client"
import { ArrowBack } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import axios from "axios";

interface dataProps {
  profile_picture?: undefined,
  username?: string,
  bio?: string
}

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const user = useSelector((state: any) => state.signup.values)
  const [invalidError, setInvalidError] = useState(
    {
      status: false,
      username: "",
    }

  );

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }

  };

  const submit: SubmitHandler<dataProps> = async (data: dataProps) => {
    if (!data.profile_picture) {
      // Throw an error
      throw new Error("The profile_picture property is missing");
    }
    const { region, district, confirm_password, ...others } = user
    const user2 = { ...others, address: region + district }
    const data2 = { ...data, profile_picture: data.profile_picture[0] }


    const dataToBeSent = { ...user2, ...data2 }
    const res = await axios.post("http://localhost:8000/register",

      dataToBeSent, {
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    }
    )
  }
  return (
    <main className="flex flex-col h-screen w-screen p-4">
      <button className="bg-blue-950 p-2 text-white rounded basis 1/6 w-fit">
        <Link href="/signup">
          <ArrowBack /> Go Back
        </Link>
      </button>
      <div className="basis-5/6 flex flex-col justify-center items-center">
        <p className="px-6 py-">Complete Your Profile</p>
        <form className="flex flex-col gap-y-3 border border-black rounded p-12 px-16 "
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex flex-col">
            <p className="text-xs">Add Your Profile Picture (optional)</p>
            <div className="w-full flex  justify-center items-center ">

              <label className="cursor-pointer">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center ">
                  {
                    selectedImage ?
                      (
                        <div
                          className="w-24 h-24 rounded-full overflow-hidden"
                          style={{ clipPath: 'circle(50% at 50% 50%)' }}
                        >
                          <img
                            src={selectedImage}
                            alt="Profile"
                            className="w-24 h-24 object-cover"
                          /></div>
                      ) : (

                        <FontAwesomeIcon icon={faCamera} size="1x" style={{ width: '2em', height: '2em' }} />
                      )
                  }

                  <TextField
                    sx={{ display: 'none', }}
                    type="file"

                    {...register("profile_picture", { onChange: handleImageSelect })}
                  />
                </div>
              </label>
            </div>
          </div>
          <div>
            <p className="text-xs">Enter Your Username</p>
            <TextField
              error={invalidError.status && invalidError.username != ""}
              helperText={invalidError.username}
              label="Username"

              size="small"
              required
              onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
                err.preventDefault();
                setInvalidError({ ...invalidError, username: err.target.validationMessage, status: true })
              }}
              {...register("username", { onChange: () => setInvalidError({ ...invalidError, username: '' }) })}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#bebebe',

                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#bebebe',
                },
              }}

            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs">Add Your Bio (optional)</p>
            <TextField multiline rows={2}
              {...register("bio")}
            />
          </div>
          <button className="bg-blue-900 px-[5rem] py-1 text-white rounded-md" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;
