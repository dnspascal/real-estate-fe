"use client";
import { ArrowForward, DoneAll, OfflinePin, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  MenuItem,
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton
} from "@mui/material";
import React, { useEffect, useState, } from "react";
import { useForm } from 'react-hook-form';
import { districts, regions } from "@/constants";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { signup } from "@/app/slices/first_slice";
import Image from "next/image";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Registration = () => {

  const router = useRouter();


  const [invalidError, setInvalidError]
    = useState({
      status: false,
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
      region: "",
      district: "",
      password: "",
      confirmPassword: "",
    });

  const { register, handleSubmit, watch, getValues, setValue } = useForm()
  const regionDistricts = districts.filter((item) => item.region == watch("region"))
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("signupData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, []);




  const submit = (data: any) => {
    dispatch(signup(data));

    router.push("/addProfileAndBio");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#f8fafc] overscroll-contain gap-y-5 py-8">
      <img src="/estatevision2-removebg-preview.png" width={200} height={200}  />

      <p className="text-2xl font-extrabold">Sign Up At EstateVision</p>

      <form
        className=" bg-white drop-shadow-lg rounded-md flex flex-col justify-center gap-y-1 sm:gap-y-6 items-center w-[28rem] py-16"
        onSubmit={handleSubmit(submit)}

      >
        <TextField
          error={invalidError.status && invalidError.firstName != ""}
          size="small"
          type="text"
          required
          helperText={invalidError.firstName}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({ ...invalidError, firstName: err.target.validationMessage, status: true })
          }}

          label="Firstname"
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',

            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#bebebe',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused': {
                border: '10px ',
              }
            },

            '& input': {

              height: '0.5cm',
            },
            width: '9cm'
          }}

          {...register("first_name", { onChange: (e) => setInvalidError({ ...invalidError, firstName: '' }) })}
        />
        <TextField
          error={invalidError.status && invalidError.lastName != ""}
          size="small"
          type="text"
          required
          helperText={invalidError.lastName}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({ ...invalidError, lastName: err.target.validationMessage, status: true })
          }}

          label="Last name"
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bebebe',

            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#bebebe',
            },
            width: '9cm'

          }}

          {...register("last_name", { onChange: () => setInvalidError({ ...invalidError, lastName: '' }) })}
        />
        <TextField
          error={invalidError.status && invalidError.email != ""}
          size="small"
          type="email"
          required

          helperText={
            invalidError.email == "Please fill out this field." ? "Please fill out this field." : invalidError.email == "" ? "" : "Please enter correct email format"


          }
          label="Email"
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({ ...invalidError, email: err.target.validationMessage, status: true })


          }}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bebebe',

            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#bebebe',
            },
            width: '9cm'
          }}
          {...register("email", { required: 'required error', onChange: () => setInvalidError({ ...invalidError, email: '' }) })}
        />
        <TextField
          error={invalidError.status && invalidError.phone_number != ""}
          size="small"
          type="text"
          required
          helperText={invalidError.phone_number}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({ ...invalidError, phone_number: err.target.validationMessage, status: true });
          }}

          label="Phone number"
          inputProps={{ inputMode: "numeric", pattern: "[+,0-9]*" }}
          {...register('phone_number', { onChange: (e) => setInvalidError({ ...invalidError, phone_number: "" }), maxLength: 15 })}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bebebe',

            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#bebebe',
            },
            width: '9cm'

          }}
        />
        <div className="sm:p-4 space-y-2 flex flex-col">
          <p className="text-xs bg-yellow-40">Enter Your Address here</p>


          <FormControl sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bebebe',

            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#bebebe',
            },
            width: '9cm'
          }} error={invalidError.status && invalidError.region != ""} size="small" >
            <InputLabel id="region-label">Region</InputLabel>
            <Select
              onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
                err.preventDefault();
                setInvalidError({ ...invalidError, region: err.target.validationMessage, status: true });
              }}

              labelId="region-label"
              id="region"
              {...register("region", { onChange: (e) => setInvalidError({ ...invalidError, region: "" }), })}
              required
              input={<OutlinedInput label="Region" />}
              MenuProps={MenuProps}
            >
              {regions.map((region, index) => (
                <MenuItem

                  key={index}
                  value={region}

                >
                  {region}
                </MenuItem>
              ))}

            </Select>
            <FormHelperText>{invalidError.region}</FormHelperText>
          </FormControl>
          <FormControl
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bebebe',

              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#bebebe',
              },
              width: '9cm'
            }}

            size="small" error={invalidError.status && invalidError.district != ""}>
            <InputLabel id="district-label">District</InputLabel>
            <Select

              onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
                err.preventDefault();
                setInvalidError({ ...invalidError, district: err.target.validationMessage, status: true })
              }}
              required
              labelId="district-label"
              id="district"
              {...register('district', { onChange: () => setInvalidError({ ...invalidError, district: "" }), })}

              input={<OutlinedInput label="District" />}
              MenuProps={MenuProps}
            >
              {regionDistricts[0]?.districts.map((district, index) => (
                <MenuItem

                  key={index}
                  value={district}
                >
                  {district}
                </MenuItem>
              ))}

            </Select>
            <FormHelperText>{invalidError.district}</FormHelperText>
          </FormControl>
        </div>
        <TextField
          error={invalidError.status && invalidError.password != ""}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bebebe',

            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#bebebe',
            },
            width: '9cm'

          }}
          size="small"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          helperText={invalidError.password}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>,
          }}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({ ...invalidError, password: err.target.validationMessage, status: true })
          }}
          {...register("password", {
            onChange: (e) => {

              if (watch("confirm_password") !== "") {

                e.target.value === watch("confirm_password") ? setInvalidError({ ...invalidError, confirmPassword: "", password: "" }) : watch("password") === "" ? setInvalidError({ ...invalidError, confirmPassword: "Password field above is empty" }) :
                  setInvalidError({ ...invalidError, confirmPassword: "Confirm password does not match ", status: true, password: "" })
              } else {
                setInvalidError({ ...invalidError, password: "", confirmPassword: "" })

              }

            },
          })}
        />
        <div className="flex flex-col">


          <TextField
            error={invalidError.status && invalidError.confirmPassword != ""}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bebebe',

              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#bebebe',
              }, width: '9cm'

            }}
            size="small"
            type={showConfirmPassword ? 'text' : 'password'}
            helperText={invalidError.confirmPassword}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
            onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
              err.preventDefault();
              setInvalidError({ ...invalidError, confirmPassword: err.target.validationMessage, status: true })
            }}
            required
            label="Confirm password"
            {...register("confirm_password", { onChange: (e) => { watch("password") == "" && watch("confirm_password") != "" ? setInvalidError({ ...invalidError, confirmPassword: "Password field above is empty", status: true }) : e.target.value === watch("password") ? setInvalidError({ ...invalidError, confirmPassword: "" }) : setInvalidError({ ...invalidError, confirmPassword: "Confirm password does not match", status: true }) } })}
          />
          {watch("confirm_password") == undefined ? "" : watch("confirm_password") == "" ? "" : watch("password") === watch("confirm_password") && (<span className="text-xs text-green-900 py-1 flex gap-x-1">
            Confirm password matches password
            <OfflinePin sx={{ fontSize: 17, }} />
            {/* <DoneAll sx = {{fontSize:18}} /> */}
          </span>)}
        </div>


        <span>
          <p className="text-xs italic"> Already have an account ?</p>
          <p className="text-blue-900 flex flex-start w-[21.3rem] font-bold">
            <span className="cursor-pointer" onClick={() => router.push("/signin")}>
              Sign in
            </span>
          </p>
        </span>
        <button
          disabled={watch("password") !== watch("confirm_password")}
          type="submit"
          className="bg-blue-900 rounded w-[21.3rem] font-bold  px-[1rem] py-1 text-white text-xs sm:text-lg disabled:cursor-not-allowed disabled:opacity-10 "
        >
          Continue <ArrowForward />



        </button>
      </form>


    </main>
  );
};

export default Registration;




