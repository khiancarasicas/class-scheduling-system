import InfoCardWrapper from "@/ui/pages/main/dashboard/cards";
import { Separator } from "@/shadcn/components/ui/separator";
import { Card, CardDescription, CardHeader } from "@/shadcn/components/ui/card";

//

export default function Dashboard() {
  return (
    <main className="space-y-8">
      <div className="space-y-2">
        <div className="text-base font-medium">Dashboard</div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCardWrapper />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="text-base font-medium">Today's Class Schedule</div>
        <Card className="h-600">
          <CardHeader>
            <CardDescription>Heh</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
