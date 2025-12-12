import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Share2, Gift, AlertCircle } from "lucide-react";

interface CampaignPageProps {
  params: Promise<{ campaignId: string }>;
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { campaignId } = await params;

  // TODO: Fetch actual campaign data from database
  const mockCampaign = {
    id: campaignId,
    businessName: "Demo Business",
    campaignName: "Share Your Experience",
    rewardAmount: 200, // cents
    hashtag: "#DemoBusiness",
    platform: "Instagram",
    postingWindowHours: 2,
    minimumPostDurationHours: 24,
    disclosureText: "This post includes #ad for a discount at Demo Business",
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-lg mx-auto py-8 px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{mockCampaign.businessName}</CardTitle>
            <CardDescription className="text-lg">
              {mockCampaign.campaignName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reward info */}
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Gift className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-primary">
                Earn {formatCurrency(mockCampaign.rewardAmount)}
              </p>
              <p className="text-sm text-muted-foreground">
                in credits for your next visit
              </p>
            </div>

            {/* How it works */}
            <div className="space-y-4">
              <h3 className="font-semibold">How to earn your reward:</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Check in</p>
                    <p className="text-sm text-muted-foreground">
                      Tap &quot;Start Visit&quot; below to begin your check-in
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Share2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Post on {mockCampaign.platform}</p>
                    <p className="text-sm text-muted-foreground">
                      Share a photo/video within {mockCampaign.postingWindowHours} hours using{" "}
                      <span className="font-mono bg-muted px-1 rounded">{mockCampaign.hashtag}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Gift className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Get verified & earn</p>
                    <p className="text-sm text-muted-foreground">
                      Submit your post link and receive {formatCurrency(mockCampaign.rewardAmount)} credit
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FTC Disclosure notice */}
            <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200">Disclosure Required</p>
                <p className="text-amber-700 dark:text-amber-300">
                  Your post must include proper disclosure. We&apos;ll provide suggested text that complies with FTC guidelines.
                </p>
              </div>
            </div>

            {/* CTA */}
            <Button className="w-full" size="lg">
              Start Visit
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By participating, you agree to our terms of service and understand that your post must remain public for at least {mockCampaign.minimumPostDurationHours} hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
