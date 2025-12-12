"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Building2 } from "lucide-react";
import { createBusiness, type BusinessFormState } from "./actions";

export default function OnboardingPage() {
  const initialState: BusinessFormState = { errors: {} };
  const [state, formAction, isPending] = useActionState(createBusiness, initialState);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 rounded-full bg-primary/10 p-3 w-fit">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Set Up Your Business</CardTitle>
          <CardDescription>
            Tell us about your business to get started with Social Perks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state.errors?._form && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {state.errors._form.join(", ")}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Business Name"
                required
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive">{state.errors.name.join(", ")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">socialperks.com/</span>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="your-business"
                  className="flex-1"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Letters, numbers, and hyphens only. This will be your unique business URL.
              </p>
              {state.errors?.slug && (
                <p className="text-sm text-destructive">{state.errors.slug.join(", ")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell customers about your business..."
                rows={3}
              />
              {state.errors?.description && (
                <p className="text-sm text-destructive">{state.errors.description.join(", ")}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, State"
              />
              {state.errors?.address && (
                <p className="text-sm text-destructive">{state.errors.address.join(", ")}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                />
                {state.errors?.phone && (
                  <p className="text-sm text-destructive">{state.errors.phone.join(", ")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://yourbusiness.com"
                />
                {state.errors?.website && (
                  <p className="text-sm text-destructive">{state.errors.website.join(", ")}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Business
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
