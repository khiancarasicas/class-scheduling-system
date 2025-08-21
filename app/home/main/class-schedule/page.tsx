import InfoCardWrapper from "@/ui/pages/main/dashboard/cards";
import { Separator } from "@/shadcn/components/ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { MainSection } from "@/ui/components/main-section";

function ClassScheduleCard({ time, subject, teacher }: { time: string; subject: string; teacher: string }) {
  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{subject}</CardTitle>
        <CardDescription>{time}</CardDescription>
      </CardHeader>
      <div className="px-2 text-sm text-muted-foreground">Instructor: {teacher}</div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <MainSection>
      {/* Dashboard Metrics */}
      <MainSection.Section>
        <MainSection.Title>Dashboard</MainSection.Title>
        <MainSection.Content>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCardWrapper />
          </div>
        </MainSection.Content>
      </MainSection.Section>

      <Separator />

      {/* Class Schedule */}
      <MainSection.Section>
        <MainSection.Title>Today's Class Schedule</MainSection.Title>
        <MainSection.Content>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ClassScheduleCard time="8:00 AM - 9:30 AM" subject="Mathematics 101" teacher="Prof. Reyes" />
            <ClassScheduleCard time="10:00 AM - 11:30 AM" subject="Physics 202" teacher="Dr. Santos" />
            <ClassScheduleCard time="1:00 PM - 2:30 PM" subject="History 305" teacher="Mr. Cruz" />
            <ClassScheduleCard time="3:00 PM - 4:30 PM" subject="Computer Science 110" teacher="Ms. Dela Cruz" />
          </div>
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
