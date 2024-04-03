"use client";
import React from "react";
import {
  Moon,
  Sun,
  PieChart,
  List,
  Bird,
  LogOut,
  Settings,
} from "lucide-react";

import SideIcon from "./components/SideIcon";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const { setTheme } = useTheme();
  const handleLogOut = () => {};

  const SIDE_ELEMENTS_TOP = [
    {
      tooltipLabel: "Dashboard shortcut: d",
      icon: <PieChart className="h-5 w-5" />,
      link: "/",
    },
    {
      tooltipLabel: "Transacciones shortcut: t",
      icon: <List className="h-5 w-5" />,
      link: "/transactions",
    },
  ];

  const SIDE_ELEMENTS_BOTTOM = [
    {
      tooltipLabel: "Settings",
      icon: <Settings className="h-5 w-5" />,
      link: "/settings",
    },
    {
      tooltipLabel: "Salir",
      icon: <LogOut className="h-5 w-5" />,
      onClick: handleLogOut,
    },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 top-0 z-[1] hidden min-h-full w-[70px] flex-col bg-background px-3 py-2 transition-all sm:flex sm:w-[64px] sm:dark:border-r border-r`}
    >
      <div className="z-[10] mb-[10px] flex h-full w-[100%] flex-col justify-between">
        <div className="flex h-full flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <Bird className="h-10 w-10 mb-6 mt-2" />
            {SIDE_ELEMENTS_TOP.map((sideElement) => {
              return (
                <SideIcon
                  key={sideElement.tooltipLabel}
                  tooltipLabel={sideElement.tooltipLabel}
                  icon={sideElement.icon}
                />
              );
            })}
          </div>
          <div className="flex flex-col items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="mb-2">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {SIDE_ELEMENTS_BOTTOM.map((sideElement) => {
              return (
                <SideIcon
                  key={sideElement.tooltipLabel}
                  tooltipLabel={sideElement.tooltipLabel}
                  icon={sideElement.icon}
                />
              );
            })}
            <span className="mt-2 text-sm">v1</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
