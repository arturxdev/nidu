import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SideIconProps = {
  icon: any;
  tooltipLabel?: string;
  link?: string;
  onClick?(): void;
};

const SideIcon = ({ icon, tooltipLabel, link, onClick }: SideIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="mb-2"
            onClick={onClick}
          >
            {link ? <Link href={link}>{icon}</Link> : <>{icon}</>}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltipLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SideIcon;
