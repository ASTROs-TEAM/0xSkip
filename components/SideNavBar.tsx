"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import myhabits from "../app/my-habits.svg";
import explorehabits from "../app/explore.svg";
import createhabit from "../app/create-new-2.svg";
import claim from "../app/money-bag.svg"

const SideNavBar = () => {
  const sidebar = [
    {
      title: "My Habits",
      icon: myhabits,
      href: "/dashboard/my-habits",
    },
    {
      title: "Explore Habits",
      icon: explorehabits,
      href: "/dashboard/explore-habits",
    },
    {
      title: "My Claim",
      icon: claim,
      href: "/dashboard/my-claims",
    },
    {
      title: "Create New Habit",
      icon: createhabit,
      href: "/dashboard/create-new-habit",
    },
  ];
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="sticky left-0 top-20 flex flex-col w-full h-[90vh] border-r-[1px] border-white/10 text-white">
      <div className="flex-1 flex flex-col space-y-4  p-4">
        {sidebar.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`${
                isActive && "bg-tertiary/20 text-tertiary"
              } p-4 rounded-md text-center cursor-pointer `}
            >
              <div className="flex gap-4 items-center">
                <div>
                  <Image src={item.icon} alt={item.title} className="w-6 h-6" />
                </div>
                <div>{item.title}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-700 w-full">
        <p className="text-xl text-foreground/80 mb-4 font-bricolage">
          Hello,{" "}
          <span className="text-tertiary text-2xl font-semibold ">
            {session?.user?.name}
          </span>
        </p>
        <Button className="w-full" onClick={() => signOut({ redirectTo: "/" })}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideNavBar;
