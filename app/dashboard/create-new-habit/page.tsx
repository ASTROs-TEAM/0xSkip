"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  const forms = [
    {
      label: "Habit Name",
      input: "text",
      placeholder: "Enter habit name",
    },
    {
      label: "Description",
      input: "text",
      placeholder: "Enter habit description",
    },
    {
      label: "Entry Prize",
      input: "number",
      placeholder: "Enter entry prize",
    },
    {
      label: "Start Date",
      input: "date",
      placeholder: "Enter start date",
    },
    {
      label: "Duration",
      input: "number",
      placeholder: "Enter duration in days",
    },
  ];
  return (
    <div className="flex flex-col h-full px-4 py-6">
      <div className="mb-4 text-foreground/80">
        <h1 className="text-4xl font-bold pl-1">Create New Habit</h1>
        <p className="text-foreground/60 pl-2 font-normal">
          Create a new habit to challenge yourself and grow. Your journey begins
          here !!!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 my-4 ">
        {forms.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-3 my-1">
              <label className="text-foreground/90">{item.label}</label>
              <Input
                className=" rounded-md p-2 text-foreground font-normal"
                type={item.input}
                placeholder={item.placeholder}
              />
            </div>
          );
        })}
        <div className="mt-2">
          <label className="text-foreground/90">Max Participants</label>
          <Input
            className="rounded-md p-2 text-foreground font-normal mt-2"
            type="number"
            min={3}
            max={20}
          />
          <span className="font-light text-foreground/60 pl-2 mt-2 text-xs">Participants count must be between 3 and 20</span>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button className="">Start Habit</Button>
      </div>
    </div>
  );
};
export default page;
