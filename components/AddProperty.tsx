"use client";
import { addToProduct } from "@/app/slices/property_slice";
import { districts, regions } from "@/constants";
import { Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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

const AddProperty = () => {
  const maxInput = 5;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { register, control, handleSubmit, getValues, setValue, watch } =
    useForm();
    const dispatch = useDispatch()
    const router = useRouter()
  const [invalidError, setInvalidError] = useState({
    status: false,
    price: "",
    conditions: "",
    region: "",
    district: "",
    street: "",
    estate_name: "",
    utilities: "",
    is_for_sale:"",
    description: "",
  });
  const regionDistricts = districts.filter(
    (item) => item.region == watch("address.region")
  );
  const submitProperty = (data: any) => {
    // const { file_uploads,utilities,region,district,street, ...others } = data;
    const { file_uploads,utilities,...others } = data;

    console.log({ ...others, profile_pictures: selectedFiles });

   
    console.log(data)
    // dispatch(addToProduct({ ...others,address:{region,district,street},utilities:utilities.toString()}))
    
    dispatch(addToProduct({ ...others,utilities:utilities.toString()}))

    router.push('/sell/commercial/add_commercial_property/commercial_attributes')
  };

  return (
    <form
      onSubmit={handleSubmit(submitProperty)}
      className="border sm:w-3/4 lg:w-1/2  w-full flex flex-col  h-fit sm:m-0 mx-3 sm:gap-y-4 overflow-y-scroll rounded p-4"
    >
      <p>Please Fill out the form to proceed</p>
      <div className="flex gap-x-3 lg:flex-row flex-col gap-y-3">
        <TextField
          label="Price"
          type="number"
          required
          error={invalidError.status && invalidError.price !== ""}
          helperText={invalidError.price}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({
              ...invalidError,
              price: err.target.validationMessage,
              status: true,
            });
          }}
          {...register("price", {
            onChange: (e) => setInvalidError({ ...invalidError, region: "" }),
          })}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#bebebe",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bebebe",
            },
          }}
        />
        <FormControl
          fullWidth
          required
          error={invalidError.status && invalidError.conditions !== ""}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({
              ...invalidError,
              conditions: err.target.validationMessage,
              status: true,
            });
          }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#bebebe",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bebebe",
            },
          }}
        >
          <InputLabel id="conditions">Conditions</InputLabel>
          <Select
            {...register("conditions", {
              onChange: (e) => setInvalidError({ ...invalidError, region: "" }),
            })}
            labelId="conditions"
            input={<OutlinedInput label="Conditions" />}
          >
            <MenuItem value="newly built">Newly Built</MenuItem>
            <MenuItem value="Used">Used property</MenuItem>
          </Select>
          <FormHelperText>{invalidError.conditions}</FormHelperText>
        </FormControl>
      </div>
      <div className=" lg:flex-row flex justify-center  sm:gap-x-3 gap-y-2 sm:gap-y-0 items-center flex-col ">
        <FormControl
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#bebebe",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bebebe",
            },
          }}
          error={invalidError.status && invalidError.region != ""}
          fullWidth
        >
          <InputLabel id="region-label">Region</InputLabel>
          <Select
            onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
              err.preventDefault();
              setInvalidError({
                ...invalidError,
                region: err.target.validationMessage,
                status: true,
              });
            }}
            labelId="region-label"
            id="region"
            {...register("address.region", {
              onChange: (e) => setInvalidError({ ...invalidError, region: "" }),
            })}
            required
            input={<OutlinedInput label="Region" />}
            MenuProps={MenuProps}
          >
            {regions.map((region, index) => (
              <MenuItem key={index} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{invalidError.region}</FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#bebebe",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bebebe",
            },
          }}
          fullWidth
          error={invalidError.status && invalidError.district != ""}
        >
          <InputLabel id="district-label">District</InputLabel>
          <Select
            onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
              err.preventDefault();
              setInvalidError({
                ...invalidError,
                district: err.target.validationMessage,
                status: true,
              });
            }}
            required
            labelId="district-label"
            id="district"
            {...register("address.district", {
              onChange: () =>
                setInvalidError({ ...invalidError, district: "" }),
            })}
            input={<OutlinedInput label="District" />}
            MenuProps={MenuProps}
          >
            {regionDistricts[0]?.districts.map((district, index) => (
              <MenuItem key={index} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{invalidError.district}</FormHelperText>
        </FormControl>
      </div>
      <div className="flex gap-x-3 lg:flex-row flex-col gap-y-3">
        <TextField
          label="Street"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#bebebe",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bebebe",
            },
          }}
          required
          error={invalidError.status && invalidError.street !== ""}
          helperText={invalidError.street}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({
              ...invalidError,
              street: err.target.validationMessage,
              status: true,
            });
          }}
          {...register("address.street", {
            onChange: (e) => setInvalidError({ ...invalidError, street: "" }),
          })}
        />
        <TextField
          label="Estate Name"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#bebebe",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bebebe",
            },
          }}
          {...register("estate_name", {
            onChange: (e) => setInvalidError({ ...invalidError, region: "" }),
          })}
        />
      </div>
      <div className="flex gap-x-3 lg:flex-row flex-col gap-y-3">
        <FormControl
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#bebebe",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bebebe",
            },
          }}
          error={invalidError.status && invalidError.is_for_sale !== ""}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({
              ...invalidError,
              is_for_sale: err.target.validationMessage,
              status: true,
            });
          }}
        >
          <InputLabel>For Sell or Rent</InputLabel>
          <Select required
            {...register("is_for_sale", {
              onChange: (e) => setInvalidError({ ...invalidError, is_for_sale: "" }),
            })}
            input={<OutlinedInput label="For Sell or Rent" />}
          >
            <MenuItem  value={0}>Rent</MenuItem>
            <MenuItem value={1}>Sell</MenuItem>
          </Select>
          <FormHelperText>{invalidError.is_for_sale}</FormHelperText>
        </FormControl>

        <TextField
          type="text-area"
          label="Description"
          required
          fullWidth
          {...register("description")}
          error={invalidError.status && invalidError.street !== ""}
          helperText={invalidError.description}
          onInvalid={(err: React.InvalidEvent<HTMLInputElement>) => {
            err.preventDefault();
            setInvalidError({
              ...invalidError,
              description: err.target.validationMessage,
              status: true,
            });
          }}
        />
      </div>
      <div>
        <span>Utilities</span>
        <FormGroup row={true}>
          <FormControlLabel
            control={<Checkbox value={"water"} {...register("utilities")} />}
            label="Water"
          />
          <FormControlLabel
            control={
              <Checkbox value={"electricity"} {...register("utilities")} />
            }
            label="Electricity"
          />
        </FormGroup>
      </div>
     
      <button
        type="submit"
        className="bg-blue-900 p-3 text-white hover:opacity-80"
      >
        Proceed
      </button>
    </form>
  );
};

export default AddProperty;
