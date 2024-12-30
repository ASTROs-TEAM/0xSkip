import React, { FC } from "react";
import { ArrowUpRight } from "lucide-react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";
import personicon from "@/app/persons.svg";
import ethereumicon from "@/app/ethereum.svg";
import Link from "next/link";

interface ExplorehabitsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ExplorehabitsVariants> {
  title: string;
  description: string;
  participants: number;
  entryPrize: string;
  habitid: string
}

const ExplorehabitsVariants = cva(
  "rounded-lg p-4 m-1 shadow-md transition-colors border-[1px] border-white/10",
  {
    variants: {
      variant: {
        default: "bg-background text-white",
        outline: "border border-gray-300 bg-white text-gray-900",
      },
      size: {
        default: "w-96 h-50",
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
  title,
  description,
  participants,
  entryPrize,
  habitid,
  ...props
}) => {
  return (
    <div
      className={cn(ExplorehabitsVariants({ variant, size, className }))}
      {...props}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-foreground/60 pl-1">{description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="flex items-center gap-1">
            <Image src={personicon} alt="person icon" width={16} height={16} />
            {participants}
          </span>
          <span className="flex items-center gap-1">
            <Image
              src={ethereumicon}
              alt="ethereum icon"
              width={16}
              height={16}
            />
            {entryPrize}
          </span>
        </div>
        <Link href={`/dashboard/specific-event/${habitid}`} className="text-sm hover:underline hover:text-tertiary bg-transparent p-2 rounded-md flex items-center">
          More info
          <ArrowUpRight className="text-tertiary" size="20px" />
        </Link>
      </div>
    </div>
  );
};

export { Explorehabits, ExplorehabitsVariants };
