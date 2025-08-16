import InfoCardWrapper from "@/ui/pages/main/dashboard/cards";
import { Separator } from "@/shadcn/components/ui/separator";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/shadcn/components/ui/card";

//

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="text-base font-medium">Dashboard</div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCardWrapper />
      </div>
      <Separator className="my-6" />
      <div className="text-base font-medium">Today's Class Schedule</div>
      <Card className="mt-2 h-600">
        <CardHeader>
          <CardDescription>Heh</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
