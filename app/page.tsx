import Header from "@/components/Header";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slideData = [
  {
    title: "Mystic Mountains",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Urban Dreams",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Neon Nights",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Desert Whispers",
    button: "Explore Component",
    src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  return (
    <div className="w-full min-h-dvh">
      <BackgroundBeams className="w-full min-h-dvh" />
      <Header />
      <div className="w-full">
        <div className="w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden rounded-md">
          <p className="text-[80px] leading-tight font-bricolage text-center">
            Never Skip your Habits with
            <span className="font-bold text-tertiary text-[100px]">
              0x Skip
            </span>
          </p>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-between items-center px-8 py-20">
        <div className="w-full md:w-1/2 max-w-[50%] space-y-4">
          <h1 className="text-6xl font-bold text-foreground">
            Explore 0xSkip{" "}
            <p className="text-tertiary text-4xl mt-2">Habit Tracker</p>
          </h1>
          <p className="text-lg text-foreground/60">
            Practice new Habits with group of people with the help of
            Blockchain. Create and share a private habit with your friends to
            enhance and improve your habit.
          </p>
          <button className="bg-tertiary text-foreground px-6 py-2 rounded-lg hover:bg-opacity-80 transition">
            Explore More
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[400px] overflow-hidden">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Featured Collections
            </h1>
            <Carousel className="relative w-full">
              <CarouselContent className="flex">
                {slideData.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="min-w-[300px] max-w-[400px] mx-2"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-[300px] w-full object-cover rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
