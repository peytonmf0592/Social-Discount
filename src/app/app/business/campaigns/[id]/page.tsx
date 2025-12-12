import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, QrCode, Link as LinkIcon, Copy, Users, CheckCircle, Clock } from "lucide-react";
import { getCampaignById } from "../actions";
import { CampaignQRCode } from "./qr-code";
import { CampaignActions } from "./campaign-actions";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default async function CampaignDetailPage({ params }: CampaignPageProps) {
  const { id } = await params;
  const campaign = await getCampaignById(id);

  if (!campaign) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const campaignUrl = `${baseUrl}/c/${campaign.id}`;

  const stats = {
    visits: campaign.visits.length,
    submissions: campaign.visits.filter((v) => v.submission).length,
    approved: campaign.visits.filter((v) => v.submission?.verification?.status === "APPROVED").length,
    pending: campaign.visits.filter((v) => v.submission?.verification?.status === "PENDING").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/app/business/campaigns"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to campaigns
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
              <Badge variant={campaign.isActive ? "default" : "secondary"}>
                {campaign.isActive ? "Active" : "Paused"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {campaign.description || "No description"}
            </p>
          </div>
          <CampaignActions campaignId={campaign.id} isActive={campaign.isActive} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submissions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* QR Code & Link */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Campaign QR Code
            </CardTitle>
            <CardDescription>
              Print this or display it at your business for customers to scan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <CampaignQRCode url={campaignUrl} />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Share Link</Label>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
                  {campaignUrl}
                </code>
                <CopyButton text={campaignUrl} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Settings</CardTitle>
            <CardDescription>
              Current configuration for this campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reward</span>
                <span className="font-medium">{formatCurrency(campaign.rewardAmountCents)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-medium">{campaign.platform}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Required Hashtag</span>
                <span className="font-mono text-sm">{campaign.requiredHashtag || "None"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posting Window</span>
                <span className="font-medium">{campaign.postingWindowHours} hours</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min Post Duration</span>
                <span className="font-medium">{campaign.minPostDurationHours} hours</span>
              </div>
            </div>
            {campaign.suggestedDisclosure && (
              <>
                <Separator />
                <div>
                  <span className="text-sm text-muted-foreground">Suggested Disclosure</span>
                  <p className="mt-1 p-2 bg-muted rounded text-sm">
                    {campaign.suggestedDisclosure}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}

function CopyButton({ text }: { text: string }) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => navigator.clipboard.writeText(text)}
      title="Copy to clipboard"
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
}
