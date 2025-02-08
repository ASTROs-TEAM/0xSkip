"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;
  const [name, setname] = useState("");
  const [ValidateDetails, setValidateDetails] = useState<any>(null);
  const [proofOfWork, setProofOfWork] = useState<Array<String>>([""]);

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const res = await fetch(`/api/validate/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch habit details.");
        }
        const data = await res.json();
        setValidateDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching habit details:", error);
      }
    };
  
    fetchHabitDetails();
  }, [id]);

  return (
    <div>
      <div className="my-8">
        <h1 className="text-4xl font-bricolage font-semibold text-center">
          Learn JavaScript
        </h1>
        <p className="text-foreground/60 text-center font-normal w-[60%] mx-auto mt-4 leading-snug">
          Learning JavaScript is a valuable skill that opens up numerous
          opportunities in web development. By mastering JavaScript, you can
          create dynamic and interactive web applications
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
                <Textarea placeholder="Enter your progress here" />
              </DialogDescription>
            </DialogHeader>
            <div className="w-full">
              <DialogTitle className="text-2xl">Proof of Work</DialogTitle>
              <ImageUploader setFunction={setProofOfWork} />
            </div>
            <Button className="w-full mt-4">Submit</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-8">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full bg-transparent border-b-[2px] border-foreground/10">
            <TabsTrigger className="text-lg" value="account">
              Peer Validation
            </TabsTrigger>
            <TabsTrigger className="text-lg" value="password">
              Progress History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="">
            <div className="w-full px-10 p-5">
              <h2 className="font-medium text-xl">December 30, 2024</h2>
            </div>
            <div>
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

                  <Button
                    variant={"outline"}
                    className="w-max border-tertiary  "
                  >
                    Validate
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
