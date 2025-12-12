import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Share2, Gift, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-4 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Turn Social Posts Into
            <br />
            <span className="text-primary">Real Rewards</span>
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Help local businesses grow with authentic social media posts.
            Post about your favorite spots, earn credits, redeem rewards.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button size="lg">Start Earning</Button>
          </Link>
          <Link href="/login?type=business">
            <Button variant="outline" size="lg">
              For Businesses
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container py-12 md:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            How It Works
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Earn rewards in three simple steps
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
          <Card className="flex flex-col items-center text-center p-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <CardHeader className="p-0">
              <CardTitle className="text-xl">1. Check In</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <CardDescription>
                Scan the QR code at participating businesses to start your visit
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <CardHeader className="p-0">
              <CardTitle className="text-xl">2. Post & Share</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <CardDescription>
                Share your experience on social media with the required hashtag
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <CardHeader className="p-0">
              <CardTitle className="text-xl">3. Earn Credits</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <CardDescription>
                Get verified and earn credits to use on your next visit
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Businesses */}
      <section id="for-businesses" className="container py-12 md:py-24 bg-muted/50">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            For Businesses
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Turn your customers into brand ambassadors
          </p>
        </div>
        <div className="mx-auto grid gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-4 mt-8">
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Authentic Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real posts from real customers are more trusted than ads
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Gift className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Pay for Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Only reward posts that meet your campaign requirements
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>FTC Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built-in disclosure requirements keep you compliant
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Share2 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Drive Repeat Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Credits can only be redeemed at your business
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/login?type=business">
            <Button size="lg">Start a Campaign</Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join businesses and customers already using Social Perks
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/login">
              <Button size="lg">Sign Up Free</Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
