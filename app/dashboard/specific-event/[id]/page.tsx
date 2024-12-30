"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;

  const [habitDetails, setHabitDetails] = useState<any>(null);
  const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const res = await fetch(`/api/habit/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch habit details: ${res.status}`);
        }
        const data = await res.json();
        setHabitDetails(data.habit);
      } catch (err) {
        console.error("Error fetching habit details:", err);
      }
    };

    fetchHabitDetails();
  }, [id]);

  if (!habitDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col text-white h-full py-6 px-4">
      <div className="mb-6 text-foreground/80">
        <h1 className="text-4xl font-bold pl-1 mb-2">{habitDetails.title}</h1>
        <p className="text-foreground/60 pl-2">{habitDetails.description}</p>
        <div className="mt-6">
          <h1 className="text-2xl text-foreground/80 pl-2 my-4 font-semibold">
            Creator: {habitDetails.creator}
          </h1>
          <div className="grid grid-cols-3 gap-4 border-t border-foreground/20 pt-4">
            <div className="bg-gray-900 rounded-lg p-4 shadow">
              <h2 className="text-lg text-foreground/80">Participants</h2>
              <p className="text-xl font-semibold text-foreground">
                {habitDetails.participants}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 shadow">
              <h2 className="text-lg text-foreground/80">Entry Prize</h2>
              <p className="text-xl font-semibold text-foreground">
                {habitDetails.entryPrize}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 shadow">
              <h2 className="text-lg text-foreground/80">Start Date</h2>
              <p className="text-xl font-semibold text-foreground">
                {formatDate(habitDetails.startDate)}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 shadow">
              <h2 className="text-lg text-foreground/80">End Date</h2>
              <p className="text-xl font-semibold text-foreground">
                {formatDate(habitDetails.endDate)}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 shadow">
              <h2 className="text-lg text-foreground/80">Total Days</h2>
              <p className="text-xl font-semibold text-foreground">
                {habitDetails.noOfDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl text-foreground/80 pl-2 font-semibold">
          Proof of Validation
        </p>
        <p className="text-foreground/60 pl-2 mt-2">
          {habitDetails.proof_of_validation}
        </p>
        <div className="flex justify-center items-center mt-4">
          <AlertDialog>
            <AlertDialogTrigger className="bg-foreground text-black p-2 rounded-lg font-normal">Join now</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to submit???</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will take you to the next step.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-red-600 hover:bg-red-800">Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-green-600 hover:bg-green-800 text-foreground">Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Page;
