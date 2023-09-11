
"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authenticationError,setAuthenticationError] = useState(false)
  const router = useRouter();
  const {
    
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [invalidationError, setInvaliationErr] = useState({
    email: "",
    password: "",
  });

  const submitForm: SubmitHandler<Inputs> = async (info) => {
    const credentials = { email: info.email, password: info.password };
    setAuthenticationError(false)
    setLoading(true)
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    if (!result?.error) {
      // Authentication successful, you can redirect to a protected route
      router.push("/");
      setLoading(false)
      return null;
    } else {
      setLoading(false)
      setAuthenticationError(true)
      
    }
   
  };

  console.log(loading)
  return (
    <div className='h-screen w-screen flex items-center justify-center'>


      <form onSubmit={handleSubmit(submitForm)} className='shadow-xl rounded w-[90%] md:w-2/3 lg:w-[40%] px-6 xl:w-1/4  xl:gap-y-5 h-1/2 flex flex-col gap-y-2 justify-between p-3'>
        <h1 className='w-full font-bold text-center sm:text-lg text-xs lg:text-2xl'>
          Login To EstateVision
        </h1>
        <TextField sx={{
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',

          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'black',
          },
        }} type='email' onFocus={() => setInvaliationErr({ ...invalidationError, email: '' })} label="email" {...register('email', { required: 'Email field cannot be empty' })} error={!!errors.email || invalidationError.email !== ''} onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => { e.preventDefault(); setInvaliationErr({ ...invalidationError, email: e.target.validationMessage }) }} helperText={errors.email ? errors.email.message : invalidationError.email} />

        <TextField
          label="Password"
          id="outlined-end-adornment"
          error={!!errors.password}
          type={showPassword ? 'text' : 'password'}
          onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => { e.preventDefault(); setInvaliationErr({ ...invalidationError, password: e.target.validationMessage }) }}
          onFocus={() => setInvaliationErr({ ...invalidationError, password: '' })}
          helperText={errors.password ? errors.password.message : invalidationError.password}
          {...register('password',)}
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
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
            },
          }}
        />

       { authenticationError && <span className="text-red-500 text-center">email or password is incorrect</span>}

        <button
          type="submit"
         
          disabled={loading}
          className={`bg-blue-900 rounded cursor-pointer p-2 hover:opacity-70 ${
            loading && "opacity-40 cursor-not-allowed"
          }`}
        >
          {!loading ? (
            <span className="text-white">Signup</span>
          ) : (
            <span className="text-white">Signing in...</span>
          )}{" "}
        </button>
        <div className="flex gap-x-2 sm:gap-y-4 gap-y-2 flex flex-col">
        <p className="hover:text-blue-900 cursor-pointer sm:text-lg text-xs">Forgot password?</p>
        <div>
        <span className="sm:text-lg text-xs">Dont have an account?</span>{" "}
          <Link href="#" className="text-blue-900 sm:text-lg text-xs hover:opacity-75 cursor-pointer">
            Signup
          </Link>
        </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
