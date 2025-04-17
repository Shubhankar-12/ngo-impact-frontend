"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ApiRouter from "@/lib/api/apiRouter";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface NGO {
  name: string;
  email: string;
  contact_number: string;
  address: string;
  state: string;
  city: string;
  registered_on: Date;
}

interface Error {
  name?: string;
  email?: string;
  contact_number?: string;
  address?: string;
  state?: string;
  city?: string;
  registered_on?: string;
}

const page = () => {
  const [data, setData] = useState<NGO>({
    name: "",
    email: "",
    contact_number: "",
    address: "",
    state: "",
    city: "",
    registered_on: new Date(),
  });

  const [errors, setErrors] = useState<Error>();

  const router = useRouter();

  const updateData = (field: Partial<NGO>) => {
    setData((prev) => ({ ...prev, ...field }));
  };

  const updateError = (field: Partial<Error>) => {
    setErrors((prev) => ({ ...prev, ...field }));
  };

  const validatePhone = (phone: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleValidation = async () => {
    let isValid = true;

    if (!data.name) {
      updateError({ name: "Name is required" });
      isValid = false;
    }

    if (!data.email) {
      updateError({ email: "Email is required" });
      isValid = false;
    }

    if (!data.contact_number) {
      updateError({ contact_number: "Contact number is required" });
      isValid = false;
    }
    if (!data.address) {
      updateError({ address: "Address is required" });
      isValid = false;
    }
    if (!data.state) {
      updateError({ state: "State is required" });
      isValid = false;
    }
    if (!data.city) {
      updateError({ city: "City is required" });
      isValid = false;
    }
    if (data.contact_number && !validatePhone(data.contact_number)) {
      updateError({ contact_number: "Invalid phone number format" });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = await handleValidation();

    if (isValid) return;

    try {
      const resp = await ApiRouter.createNgo(data);
      if (resp.status === 200) {
        toast.success("NGO created successfully");
        router.push("");
      }
    } catch (error: any) {
      console.error("Error creating NGO:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-bold">Add New NGO</h1>
        </div>
        {/* divider div  */}
        <div className="h-1 w-full bg-gray-200 mb-4" />
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 px-4">
          <div className="w-full">
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Full Name"
              value={data.name}
              onChange={(e) => {
                updateData({ name: e.target.value });
                updateError({ name: "" });
              }}
            />
            <h3 className="text-red-500 font-semibold">{errors?.name}</h3>
          </div>
          <div className="w-full">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={data.email}
              placeholder="Email"
              onChange={(e) => {
                updateData({ email: e.target.value });
                updateError({ email: "" });
              }}
            />
            <h3 className="text-red-500 font-semibold">{errors?.email}</h3>
          </div>
          <div className="w-full">
            <Label htmlFor="contact_number" className="mb-2">
              Contact Number
            </Label>
            <Input
              type="text"
              id="contact_number"
              placeholder="Contact Number"
              value={data.contact_number}
              onChange={(e) => {
                updateData({ contact_number: e.target.value });
                updateError({ contact_number: "" });
              }}
            />
            <h3 className="text-red-500 font-semibold">
              {errors?.contact_number}
            </h3>
          </div>
          <div className="w-full">
            <Label htmlFor="address" className="mb-2">
              Address
            </Label>
            <Input
              type="text"
              id="address"
              placeholder="Address"
              value={data.address}
              onChange={(e) => {
                updateData({ address: e.target.value });
                updateError({ address: "" });
              }}
            />
            <h3 className="text-red-500 font-semibold">{errors?.address}</h3>
          </div>
          <div className="w-full">
            <Label htmlFor="state" className="mb-2">
              State
            </Label>
            <Input
              type="text"
              id="state"
              value={data.state}
              placeholder="State"
              onChange={(e) => {
                updateData({ state: e.target.value });
                updateError({ state: "" });
              }}
            />
            <h3 className="text-red-500 font-semibold">{errors?.state}</h3>
          </div>
          <div className="w-full">
            <Label htmlFor="city" className="mb-2">
              City
            </Label>
            <Input
              type="text"
              id="city"
              placeholder="City"
              value={data.city}
              onChange={(e) => {
                updateData({ city: e.target.value });
                updateError({ city: "" });
              }}
            />
            <h3 className="text-red-500 font-semibold">{errors?.city}</h3>
          </div>
          <div className="w-full">
            <Label htmlFor="city" className="mb-2">
              Registered On
            </Label>
            <DateTimePicker
              hideTime
              onChange={(value) => {
                updateData({ registered_on: value });
                updateError({ registered_on: "" });
              }}
              value={data.registered_on}
            />
            <h3 className="text-red-500 font-semibold">
              {errors?.registered_on}
            </h3>
          </div>
        </div>
        <div className="flex gap-4 m-4">
          <Button variant="default" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
