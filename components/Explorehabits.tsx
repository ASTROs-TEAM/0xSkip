import React, { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils"; 
import Image from "next/image";
import personicon from "@/app/persons.svg"
import ethereumicon from "@/app/ethereum.svg"

interface ExplorehabitsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ExplorehabitsVariants> {}

const ExplorehabitsVariants = cva(
  "rounded-lg p-6 shadow-md transition-colors", 
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white",
        outline: "border border-gray-300 bg-white text-gray-900",
      },
      size: {
        default: "w-80 h-50", 
        sm: "w-64 h-32",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Explorehabits: FC<ExplorehabitsProps> = ({
  className,
  size,
  variant,
  ...props
}) => {
  return (
    <div
      className={cn(ExplorehabitsVariants({ variant, size, className }))}
      {...props}
    >
      <h2 className="text-xl font-bold mb-2">Learn Java</h2>
      <p className="text-sm text-gray-300">
        Learn Java within 30 days. Java is used to develop mobile apps, web
        apps, desktop apps, games, and much more.
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="flex items-center gap-1">
            <Image src={personicon} alt="person icon" width={16} height={16} />
            20
          </span>
          <span className="flex items-center gap-1">
            <Image src={ethereumicon} alt="person icon" width={16} height={16} />
            2
          </span>
        </div>
        <button className="text-sm hover:underline bg-[#474E93] p-2 rounded-md">More info</button>
      </div>
    </div>
  );
};

export { Explorehabits, ExplorehabitsVariants };
