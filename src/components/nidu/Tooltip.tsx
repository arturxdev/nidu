import React from "react";
import {
  Tooltip as TPUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type NiduTooltipProps = {
  children: any;
  label?: string;
  position?: "top" | "right" | "bottom" | "left";
};

const Tooltip = ({ children, label, position }: NiduTooltipProps) => {
  return (
    <TooltipProvider>
      <TPUI delayDuration={150}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={position}>
          <p className="font-normal">{label}</p>
        </TooltipContent>
      </TPUI>
    </TooltipProvider>
  );
};

export default Tooltip;
