import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import {
  BookOpen,
  Building,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react";

export default function InfoCardWrapper() {
  return (
    <>
      <InfoCard
        header="Sections"
        value="69"
        icon={GraduationCap}
      />
      <InfoCard
        header="Instructors"
        value="21"
        icon={Users}
      />
      <InfoCard
        header="Subjects"
        value="143"
        icon={BookOpen}
      />
      <InfoCard
        header="Rooms"
        value="0"
        icon={Building}
      />
    </>
  );
}

function InfoCard({
  header,
  value,
  icon,
}: {
  header: string;
  value: number | string;
  icon: LucideIcon;
}) {
  const Icon = icon;

  return (
    <Card className="from-primary/5 to-card bg-gradient-to-t">
      <CardHeader>
        <CardDescription className="text-card-foreground">
          {header}
        </CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
        <CardAction>
          <Icon size={16} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
