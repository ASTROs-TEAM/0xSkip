"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [entryPrize, setEntryPrize] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [privateHabit, setPrivateHabit] = useState(false);
  const [proofOfValidation, setProofOfValidation] = useState("");

  const { data: session }: any = useSession();

  const forms = [
    {
      label: "Habit Name",
      input: "text",
      placeholder: "Enter habit name",
      onchange: (e: any) => setHabitName(e.target.value),
      value: habitName,
    },
    {
      label: "Description",
      input: "text",
      placeholder: "Enter habit description",
      onchange: (e: any) => setDescription(e.target.value),
      value: description,
    },
    {
      label: "Entry Prize",
      input: "number",
      placeholder: "Enter entry prize",
      onchange: (e: any) => setEntryPrize(e.target.value),
      value: entryPrize,
    },
    {
      label: "Start Date",
      input: "date",
      placeholder: "Enter start date",
      onchange: (e: any) => setStartDate(e.target.value),
      value: startDate,
    },
    {
      label: "Duration",
      input: "number",
      placeholder: "Enter duration in days",
      onchange: (e: any) => setDuration(e.target.value),
      value: duration,
    },
  ];
  const handleSubmit = async () => {
    // console.log(
    //   habitName,
    //   description,
    //   entryPrize,
    //   startDate,
    //   duration,
    //   maxParticipants,
    //   privateHabit
    // )
    if (
      !habitName ||
      !description ||
      !entryPrize ||
      !startDate ||
      !duration ||
      !maxParticipants ||
      !proofOfValidation
    ) {
      console.log("toast reached");
      return toast("Please  fill the required fields");
    }

    try {
      console.log('Submitting data:', {
        // @ts-ignore
        userid: session?.userid,
        title: habitName,
        description,
        entryPrize,
        startDate,
        noOfDays: duration,
        maxparticipants: maxParticipants,
        privatehabit: privateHabit,
        proofOfValidation
      })

      const res = await axios.post('/api/habit', {
        // @ts-ignore
        userid: session?.userid,
        title: habitName,
        description,
        entryPrize,
        startDate,
        noOfDays: duration,
        maxparticipants: maxParticipants,
        privatehabit: privateHabit,
        proof_of_validation: proofOfValidation
      })

      if (res.status === 201 || res.status === 200) {
        toast.success("Habit created successfully");
        router.push("/dashboard/my-habits");
      }
    } catch (err: any) {
      console.error("Error creating habit:", err.response?.data || err.message);
      toast.error("Failed to create habit. Please try again later.");
    }
  };
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
                onChange={item.onchange}
                value={item.value}
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
            onChange={(e) => setMaxParticipants(e.target.value)}
            value={maxParticipants}
          />
          <span className="font-light text-foreground/60 pl-2 mt-2 text-xs">
            Participants count must be between 3 and 20
          </span>
        </div>
      </div>
      <div className="w-full flex justify-between items-center mt-2">
        <div>
          <label className="text-foreground/90">Proof of Validation</label>
          <textarea
            className="rounded-md w-full text-foreground font-normal bg-background p-2 border-2 border-foreground/10"
            placeholder="Enter proof of validation"
            onChange={(e) => setProofOfValidation(e.target.value)}
            value={proofOfValidation}
          />
        </div>
        <div className="flex items-center justify-between w-[50%] h-20 border-[1px] border-foreground/10 rounded-lg px-4">
          <div>
            <h1 className="text-foreground/90">Private</h1>
            <p className="text-foreground/50 text-sm">
              Only invited participants can join
            </p>
          </div>
          <Switch
            onCheckedChange={(checked) => {
              setPrivateHabit(checked);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <Button onClick={handleSubmit} className="w-1/2">
          Create Habit
        </Button>
      </div>
    </div>
  );
};
export default page;
