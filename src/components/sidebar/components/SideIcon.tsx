import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

type SideIconProps = {
  icon: any;
  tooltipLabel?: string;
  link?: string;
  onClickBtn?(): void;
};

const SideIcon = ({ icon, tooltipLabel, link, onClickBtn }: SideIconProps) => {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="mb-2"
            onClick={() =>
              link ? router.push(link) : onClickBtn && onClickBtn()
            }
          >
            <>{icon}</>
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
