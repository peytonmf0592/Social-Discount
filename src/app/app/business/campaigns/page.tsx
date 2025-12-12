import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Megaphone } from "lucide-react";
import { getMerchantCampaigns, getMerchantBusiness } from "./actions";
import { redirect } from "next/navigation";

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default async function CampaignsPage() {
  const business = await getMerchantBusiness();

  if (!business) {
    redirect("/app/business/onboarding");
  }

  const campaigns = await getMerchantCampaigns();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage your social media campaigns
          </p>
        </div>
        <Link href="/app/business/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No campaigns yet</CardTitle>
            <CardDescription>
              Create your first campaign to start generating social posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/app/business/campaigns/new">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Link key={campaign.id} href={`/app/business/campaigns/${campaign.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    </div>
                    <Badge variant={campaign.isActive ? "default" : "secondary"}>
                      {campaign.isActive ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {campaign.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reward</span>
                    <span className="font-medium">
                      {formatCurrency(campaign.rewardAmountCents)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Platform</span>
                    <span className="font-medium">{campaign.platform}</span>
                  </div>
                  {campaign.requiredHashtag && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Hashtag</span>
                      <span className="font-mono text-xs">{campaign.requiredHashtag}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
