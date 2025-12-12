"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pause, Play, Pencil, Trash2, Loader2 } from "lucide-react";
import { toggleCampaignStatus } from "../actions";
import { toast } from "sonner";

interface CampaignActionsProps {
  campaignId: string;
  isActive: boolean;
}

export function CampaignActions({ campaignId, isActive }: CampaignActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await toggleCampaignStatus(campaignId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(isActive ? "Campaign paused" : "Campaign activated");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleToggleStatus}>
          {isActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause Campaign
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Activate Campaign
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Campaign
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" disabled>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Campaign
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
