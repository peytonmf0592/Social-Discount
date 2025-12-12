import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submissions Queue</h1>
        <p className="text-muted-foreground">
          Review and verify customer post submissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No pending submissions</CardTitle>
          <CardDescription>
            All submissions have been reviewed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            When customers submit proof of their social media posts, they&apos;ll appear here for review.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
