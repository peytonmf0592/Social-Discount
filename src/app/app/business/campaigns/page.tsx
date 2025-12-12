import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function CampaignsPage() {
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
    </div>
  );
}
