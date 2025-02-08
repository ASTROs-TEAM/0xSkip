"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ImageUploader";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const page = ({ params }: any) => {
  const { data: session } = useSession();
  const [progress, setProgress] = useState("");
  const [habits, setHabits] = useState<any>({});
  const [proofOfWork, setProofOfWork] = useState<string[]>([]);

  const userid = session?.userid;
  console.log("userid", userid);

  const habitid = params.id;

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(`/api/habit/${habitid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch habits");
        }
        const data = await response.json();
        setHabits(data);
      } catch (err) {
        console.error("Error fetching habits:", err);
      }
    };
    fetchHabits();
  }, []);
  console.log("Proof of Work state:", proofOfWork);

  const handleProgressAdd = async () => {
    if (!session?.userid) {
      console.error("User not logged in");
      return;
    }
    console.log("button clicked");

    try {
      const response = await axios.post("/api/progress", {
        habitid,
        userid,
        progress,
        proof_imgs: proofOfWork,
      });

      if (response.status === 200) {
        toast.success("Proof of Validation added successfully");
        console.log("Progress added successfully:", response.data);
      } else {
        console.error("Error adding progress:", response.data);
      }
    } catch (error) {
      toast.error("Failed to add Proof of Validation");
      console.error("Error during API call:", error);
    }
  };


  return (
    <div>
      <div className="my-8">
        <h1 className="text-4xl font-bricolage font-semibold text-center">
          {habits?.habit?.title}
        </h1>
        <p className="text-foreground/60 text-center font-normal w-[60%] mx-auto mt-4 leading-snug">
          {habits?.habit?.description}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Dialog>
          <DialogTrigger>
            <Button className="w-max">Update Progress</Button>
          </DialogTrigger>
          <DialogContent className="p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl">Progress</DialogTitle>
              <DialogDescription className="text-md text-foreground">
                <Textarea
                  placeholder="Enter your progress here"
                  onChange={(e) => setProgress(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <div className="w-full">
              <DialogTitle className="text-2xl">Proof of Work</DialogTitle>
              <ImageUploader setFunction={setProofOfWork} />
            </div>
            <Button className="w-full mt-4" onClick={handleProgressAdd}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-8">
        <Tabs defaultValue="progress-history" className="w-full">
          <TabsList className="w-full bg-transparent border-b-[2px] border-foreground/10">
            <TabsTrigger
              className="text-lg  data-[state=active]:border-b-tertiary  data-[state=active]:border-b-[1px]"
              value="peer-validation"
            >
              Peer Validation
            </TabsTrigger>
            <TabsTrigger
              className="text-lg  data-[state=active]:border-b-tertiary  data-[state=active]:border-b-[1px]"
              value="progress-history"
            >
              Progress History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="peer-validation" className="">
            <div className="w-full px-10 p-5">
              <h2 className="font-medium text-xl">December 30, 2024</h2>
            </div>
            <div>
              {/* // Map this card  */}
              <div className="w-[650px] h-max p-4  flex items-center justify-between bg-foreground/10 rounded-lg mx-auto">
                <p>GOKULNATH RS </p>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger>
                      <Button>View</Button>
                    </DialogTrigger>
                    <DialogContent className="p-8">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Progress</DialogTitle>
                        <DialogDescription className="text-md text-foreground">
                          I have completed the first 10 chapters of the book.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full">
                        <DialogTitle className="text-2xl">
                          Proof of Work
                        </DialogTitle>
                        <Carousel>
                          <CarouselContent>
                            {[
                              "https://firebasestorage.googleapis.com/v0/b/photo-management-app-17909.appspot.com/o/xora%2Fmusic-concert.jpg?alt=media&token=b9959dd3-2aa2-431a-a843-d948d952c095",
                              "https://firebasestorage.googleapis.com/v0/b/photo-management-app-17909.appspot.com/o/xora%2Ftech-conf.jpg?alt=media&token=a89b25a5-86ba-49a3-8f2d-f3b00165d17d",
                              "https://firebasestorage.googleapis.com/v0/b/photo-management-app-17909.appspot.com/o/xora%2Fart-exhibition.jpg?alt=media&token=e583f0ff-6779-41a9-b30b-8e3641294dab",
                            ].map((item, index) => (
                              <CarouselItem
                                key={index}
                                className="h-[300px] p-1 m-1 flex-shrink-0"
                              >
                                <img
                                  src={item}
                                  alt="proof"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant={"outline"} className="w-max border-tertiary">
                    Validate
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="progress-history">
            <div className="w-full px-10 p-5">
              <h2 className="font-medium text-xl">Your Progress</h2>
            </div>
            <div className="w-[650px] mx-auto bg-foreground/10 px-4 py-2 rounded-lg">
              <div className="w-full h-max flex items-center justify-between ">
                <div>
                  <p className="text-2xl font-bricolage">Learn JavaScript</p>
                  <Badge variant={"pending"} className="rounded-full h-4 ">
                    Pending
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger>
                      <Button>View</Button>
                    </DialogTrigger>
                    <DialogContent className="p-8">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Progress</DialogTitle>
                        <DialogDescription className="text-md text-foreground">
                          I have completed the first 10 chapters of the book. I
                          have completed the first 10 chapters of the book. I
                          have completed the first 10 chapters of the book. I
                          have completed the first 10 chapters of the book. I
                          have completed the first 10 chapters of the book.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full">
                        <DialogTitle className="text-2xl">
                          Proof of Work
                        </DialogTitle>
                        <Carousel>
                          <CarouselContent>
                            {[
                              "https://firebasestorage.googleapis.com/v0/b/photo-management-app-17909.appspot.com/o/xora%2Fmusic-concert.jpg?alt=media&token=b9959dd3-2aa2-431a-a843-d948d952c095",
                              "https://firebasestorage.googleapis.com/v0/b/photo-management-app-17909.appspot.com/o/xora%2Ftech-conf.jpg?alt=media&token=a89b25a5-86ba-49a3-8f2d-f3b00165d17d",
                              "https://firebasestorage.googleapis.com/v0/b/photo-management-app-17909.appspot.com/o/xora%2Fart-exhibition.jpg?alt=media&token=e583f0ff-6779-41a9-b30b-8e3641294dab",
                            ].map((item, index) => (
                              <CarouselItem
                                key={index}
                                className=" h-[300px] p-1 m-1 flex-shrink-0"
                              >
                                <img
                                  src={item}
                                  alt="proof"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="mt-2">
                <h1 className="text-end">30/12/2024</h1>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
