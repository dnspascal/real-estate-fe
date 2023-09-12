"use client"
import { addToProduct } from '@/app/slices/property_slice'
import axios from '@/axiosInstance'
import { property_attributes } from '@/constants'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { Close } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import { FileOptions } from 'buffer'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const Attributes = () => {
    const {register,handleSubmit,control} = useForm()
    const dispatch = useDispatch()
    const property_data = useSelector((state:any)=>state.property)
    const { data: session } = useSession();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // convert the url string to image file

 
    const submitAttributes = async(data:any)=>{
      dispatch(addToProduct({...property_data,attributes:data}))
      const imagez:any = []
      selectedFiles.forEach((selectedFile)=>{
        imagez.push({property_picture:selectedFile});
      })
      
     const dataToBeSent = {...property_data,pictures:imagez,user:session?.user?.id}
     console.log(dataToBeSent)
     const formData = new FormData()
     formData.append('user',dataToBeSent.user);
     formData.append('category',dataToBeSent.category);
     formData.append('type',dataToBeSent.type);
     formData.append('price',dataToBeSent.price);
     formData.append('conditions',dataToBeSent.conditions);
     formData.append('estate_name',dataToBeSent.estate_name);
     formData.append('description',dataToBeSent.description);
     formData.append('utilities',dataToBeSent.utilities);
     formData.append('is_for_sale',dataToBeSent.is_for_sale);

     for(const key in dataToBeSent.address){
      if (dataToBeSent.address.hasOwnProperty(key)){
        formData.append(`address.${key}`,dataToBeSent.address[key])
      }
     }
     dataToBeSent.pictures.forEach((picture:any,index:number)=>{
      for (const key in picture){
        if (picture.hasOwnProperty(key)){
          formData.append(`pictures[${index}]${key}`,picture[key])
        }
      }
    })
     

      try{
        await axios.post('/property/',formData,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }).then(async(res)=>{
         console.log(res)
          Object.entries(data).forEach(async([key,value])=>{
            const attribute_id = property_attributes.filter((item)=>item.property_type == "commercial_space")[0].attribute.filter((item)=>item.name == key)[0].id

            await axios.post('/property/property_attributes',{property:res.data.id,attribute:attribute_id,value:value})
          })
         
        }).catch((err)=>{
          console.log(err)
        })
      }catch(err){
        console.log(err)
      }
    }
    
  return (
    <form onSubmit={handleSubmit(submitAttributes)} className='flex flex-col items-center  w-full justify-center gap-4'>
      
     
     <div className='flex flex-col w-full items-center gap-y-4'>
      <p className='text-gray-700 text-xl'>What are the attributes of your property ?</p>
     {
            property_attributes.filter((item)=>item.property_type == "commercial_space")[0].attribute.map((item,index)=>
           <TextField size='medium' key=
           {index}  className=' w-1/2' type={item.type} required label={item.name} {...register(`${item.name}`)} />
           
            )
        }
     </div>
     <div className="flex flex-col justify-center items-center flex-1 w-full gap-y-3">
        <label htmlFor="images">
          <Button 
            className="bg-blue-900 text-white sm:w-64 w-32 hover:text-blue-900 hover:bg-white"
           component="span"
          >
            Upload Property Photos
          </Button>
        </label>
        <Controller
          control={control}
          name="file_uploads"
          defaultValue={[]}
          render={({ field }) => (
            <input
              id="images"
              className="hidden"
              type="file"
              accept="image/*"
              multiple
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files) {
                  const selectedImagesArray = Array.from(files).slice(
                    0,
                    5
                  );
                  setSelectedFiles((prev) => [...prev, ...selectedImagesArray]);
                }
              }}
            />
          )}
        />
        <div className="flex gap-x-2 flex-wrap gap-y-4 border bg-neutral-300 rounded">
          {selectedFiles.map((file: File, index: number) => (
            <div
              key={index}
              className="p-3 rounded shadow-sm bg-neutral-100 flex flex-col  justify-between py-2 items-center"
            >
              <span>{file.name}</span>
              <Image
                src={URL.createObjectURL(file)}
                width={100}
                height={100}
                alt={`Image ${index}`}
              />
              <span
                onClick={() =>
                  setSelectedFiles((prev) =>
                    prev.filter((_, itemIndex) => itemIndex !== index)
                  )
                }
                className="rounded-full p-2 bg-white"
              >
                <Close sx={{ color: "red" }} />
              </span>
            </div>
          ))}
        </div>
      </div>
        <button type="submit" className='bg-blue-900 p-4 sm:w-64 w-32 text-white rounded'>Add Property </button>
    </form>
  )
}

export default Attributes