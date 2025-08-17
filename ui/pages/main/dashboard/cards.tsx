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
        value="--"
        icon={GraduationCap}
      />
      <InfoCard
        header="Instructors"
        value="--"
        icon={Users}
      />
      <InfoCard
        header="Subjects"
        value="--"
        icon={BookOpen}
      />
      <InfoCard
        header="Rooms"
        value="--"
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
    // <Card className="from-primary/5 to-card bg-gradient-to-t">
    <Card>
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
