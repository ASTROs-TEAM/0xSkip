import React, { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";
import personicon from "@/app/persons.svg";
import ethereumicon from "@/app/ethereum.svg";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

interface MyHabitsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof MyHabitsCardVariants> {
  HabitTitle: string;
  HabitDesc: string;
  id: string;
  noofparticipants: number;
  privatehabit?: boolean;
  entryPrize: string;
  invite_code : number;
}

const MyHabitsCardVariants = cva(
  "rounded-lg p-6 m-1 shadow-md transition-colors border-[1px]  border-white/10",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        outline: "border border-gray-300 bg-white text-gray-900",
      },
      size: {
        default: "w-full h-50",
        sm: "w-64 h-32",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const MyHabitsCard: FC<MyHabitsCardProps> = ({
  className,
  size,
  variant,
  HabitTitle,
  HabitDesc,
  noofparticipants,
  id,
  privatehabit,
  entryPrize,
  invite_code,
  ...props
}) => {
  return (
    <div
      className={cn(MyHabitsCardVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex gap-1 items-baseline justify-between">
        <h2 className="text-xl  font-bold mb-2">{HabitTitle}</h2>
        {privatehabit && <Lock className="h-4 w-4 text-amber-500" />}
      </div>

      <p className="text-sm text-foreground/70">
        {HabitDesc &&
          (HabitDesc.length > 100
            ? HabitDesc.slice(0, 100) + "..."
            : HabitDesc)}
      </p>
      <p>
        {privatehabit && (
          <span className="text-xs text-foreground">
            Invite Code: {invite_code}
          </span>
        )}
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="flex items-center gap-1">
            <Image
              src={personicon}
              className="invert dark:invert-0"
              alt="person icon"
              width={16}
              height={16}
            />
            <p className="text-foreground/70">{noofparticipants}</p>
          </span>
          <span className="flex items-center gap-1">
            <Image
              className="invert dark:invert-0"
              src={ethereumicon}
              alt="person icon"
              width={16}
              height={16}
            />
            <p className="text-foreground/70">{entryPrize}</p>
          </span>
        </div>
        <Link
          href={`/dashboard/my-habits/${id}`}
          className="text-md hover:underline hover:text-tertiary  bg-transparent p-2 rounded-md flex items-center"
        >
          Update Progress
          <ArrowUpRight className="text-tertiary" size={"20px"} />
        </Link>
      </div>
    </div>
  );
};

export { MyHabitsCard, MyHabitsCardVariants };
