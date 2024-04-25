import React from "react";
import {
  Moon,
  Sun,
  PieChart,
  List,
  Bird,
  LogOut,
  Settings,
  Home,
} from "lucide-react";

import SideIcon from "./components/SideIcon";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ThemeDropdown from "./components/ThemeDropdown";
import { logout } from "@/services/auth";
import Image from "next/image";

const Sidebar = () => {
  const SIDE_ELEMENTS_TOP = [
    {
      tooltipLabel: "Inicio",
      icon: <Home className="h-5 w-5" />,
      link: "/home",
    },
    {
      tooltipLabel: "Transacciones",
      icon: <List className="h-5 w-5" />,
      link: "/transactions",
    },
    {
      tooltipLabel: "Reportes",
      icon: <PieChart className="h-5 w-5" />,
      link: "/charts",
    },
  ];

  const SIDE_ELEMENTS_BOTTOM = [
    /*{
      tooltipLabel: "Settings",
      icon: <Settings className="h-5 w-5" />,
      link: "/settings",
    },*/
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 top-0 z-[1] hidden min-h-full w-[70px] flex-col bg-background px-3 py-2 transition-all sm:flex sm:w-[64px] sm:dark:border-r border-r`}
    >
      <div className="z-[10] mb-[10px] flex h-full w-[100%] flex-col justify-between">
        <div className="flex h-full flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <Image
              src={"/img/nidulogo.png"}
              width={40}
              height={34}
              alt="news"
              className="mb-6"
            />

            {SIDE_ELEMENTS_TOP.map((sideElement) => {
              return (
                <SideIcon
                  key={sideElement.tooltipLabel}
                  tooltipLabel={sideElement.tooltipLabel}
                  icon={sideElement.icon}
                  link={sideElement.link}
                />
              );
            })}
          </div>
          <div className="flex flex-col items-center">
            <ThemeDropdown />
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                  <form action={logout}>
                    <Button variant="outline" size="icon" className="mb-2">
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </form>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Salir</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="mt-2 text-sm">v1</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
