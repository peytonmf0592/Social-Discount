"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createCampaign, type CampaignFormState } from "../actions";

const platforms = [
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "TIKTOK", label: "TikTok" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "TWITTER", label: "Twitter/X" },
  { value: "YOUTUBE", label: "YouTube" },
  { value: "OTHER", label: "Other" },
];

export default function NewCampaignPage() {
  const initialState: CampaignFormState = { errors: {} };
  const [state, formAction, isPending] = useActionState(createCampaign, initialState);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/app/business/campaigns"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to campaigns
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
        <p className="text-muted-foreground">
          Set up a new social media campaign for your business
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>
            Configure how customers will earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {state.errors?._form && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {state.errors._form.join(", ")}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Share Your Experience"
                required
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive">{state.errors.name.join(", ")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what customers should post about..."
                rows={3}
              />
              {state.errors?.description && (
                <p className="text-sm text-destructive">{state.errors.description.join(", ")}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rewardAmountDollars">Reward Amount ($) *</Label>
                <Input
                  id="rewardAmountDollars"
                  name="rewardAmountDollars"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="100"
                  placeholder="2.00"
                  required
                />
                {state.errors?.rewardAmountDollars && (
                  <p className="text-sm text-destructive">{state.errors.rewardAmountDollars.join(", ")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Platform *</Label>
                <Select name="platform" defaultValue="INSTAGRAM">
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state.errors?.platform && (
                  <p className="text-sm text-destructive">{state.errors.platform.join(", ")}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requiredHashtag">Required Hashtag</Label>
              <Input
                id="requiredHashtag"
                name="requiredHashtag"
                placeholder="#YourBusiness"
              />
              <p className="text-xs text-muted-foreground">
                Customers must include this hashtag in their post
              </p>
              {state.errors?.requiredHashtag && (
                <p className="text-sm text-destructive">{state.errors.requiredHashtag.join(", ")}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postingWindowHours">Posting Window (hours)</Label>
                <Input
                  id="postingWindowHours"
                  name="postingWindowHours"
                  type="number"
                  min="1"
                  max="48"
                  defaultValue="2"
                />
                <p className="text-xs text-muted-foreground">
                  Time limit to post after check-in
                </p>
                {state.errors?.postingWindowHours && (
                  <p className="text-sm text-destructive">{state.errors.postingWindowHours.join(", ")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minPostDurationHours">Min Post Duration (hours)</Label>
                <Input
                  id="minPostDurationHours"
                  name="minPostDurationHours"
                  type="number"
                  min="1"
                  max="168"
                  defaultValue="24"
                />
                <p className="text-xs text-muted-foreground">
                  Post must stay live for this long
                </p>
                {state.errors?.minPostDurationHours && (
                  <p className="text-sm text-destructive">{state.errors.minPostDurationHours.join(", ")}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="suggestedDisclosure">Suggested Disclosure Text</Label>
              <Textarea
                id="suggestedDisclosure"
                name="suggestedDisclosure"
                placeholder="e.g., Thanks to @yourbusiness for the discount! #ad #sponsored"
                rows={2}
              />
              <p className="text-xs text-muted-foreground">
                FTC-compliant disclosure text customers can copy
              </p>
              {state.errors?.suggestedDisclosure && (
                <p className="text-sm text-destructive">{state.errors.suggestedDisclosure.join(", ")}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Campaign
              </Button>
              <Link href="/app/business/campaigns">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
