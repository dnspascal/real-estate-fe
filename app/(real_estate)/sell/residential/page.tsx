"use client";
import PropertyComponent from "@/components/PropertyComponent";
import { Apartment, House, Room } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ResidentialCategory = () => {
  const router = useRouter();

  return (
    <div className="p-5 flex flex-col h-screen">
      <button
        onClick={() => router.back()}
        className="p-3 self-start rounded bg-gray-200"
      >
        Previous
      </button>
      <div className="flex items-center  flex-col   h-3/4 justify-center gap-y-6 ">
        <p className="text-3xl font-bold">
          Choose the property type that you wish to sell
        </p>
        <div className="flex gap-10">
          <PropertyComponent
            property_type={3}
            name={"House"}
            icon={<House />}
            link={"residential/add_residential_property"}
          />
          <PropertyComponent
            property_type={4}
            name={"Room"}
            icon={<Room />}
            link={"residential/add_residential_property"}
          />
          <PropertyComponent
            property_type={5}
            name={"Apartment"}
            icon={<Apartment />}
            link={"residential/add_residential_property"}
          />
        </div>
      </div>
    </div>
  );
};

export default ResidentialCategory;
