import { Card, CardContent, CardHeader } from "@/shadcn/components/ui/card";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import { Separator } from "@/shadcn/components/ui/separator";
import { Label } from "@/shadcn/components/ui/label";

// ICONS
import { Plus, Save } from "lucide-react";

export default function ScheduleAndExam() {
  return (
    <div className="space-y-6">
      {/* Schedule Subject */}
      <section>
        <h2 className="text-lg font-semibold text-blue-600">Schedule Subject</h2>

        {/* Unassigned Schedule */}
        <Card className="mt-2">
          <CardHeader>
            <p className="text-sm font-semibold text-red-600">
              Unassigned Schedule
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3 items-end">
              <div>
                <Label>Subject Name</Label>
                <Input placeholder="Information Management" />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Time Start</Label>
                <Input type="time" />
              </div>
              <div>
                <Label>Time End</Label>
                <Input type="time" />
              </div>
              <div className="flex justify-center">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white mt-6"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Schedule */}
        <Card className="mt-3">
          <CardHeader>
            <p className="text-sm font-semibold text-green-600">
              Assigned Schedule
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3 items-end">
              <div>
                <Label>Subject Name</Label>
                <Input value="Integrative Programming" readOnly />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" value="2025-05-06" readOnly />
              </div>
              <div>
                <Label>Time Start</Label>
                <Input type="time" value="08:00" readOnly />
              </div>
              <div>
                <Label>Time End</Label>
                <Input type="time" value="09:30" readOnly />
              </div>
              <div className="flex justify-center">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white mt-6"
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Assign Exam */}
      <section>
        <h2 className="text-lg font-semibold text-blue-600">Assign Exam</h2>

        {/* Unassigned Exam */}
        <Card className="mt-2">
          <CardHeader>
            <p className="text-sm font-semibold text-red-600">Unassigned Exam</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-3 items-end">
              <div>
                <Label>Section Name</Label>
                <Input value="BSIT201A" readOnly />
              </div>
              <div>
                <Label>Subject Name</Label>
                <Input value="Integrative Programming" readOnly />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" value="2025-05-06" readOnly />
              </div>
              <div>
                <Label>Time Start</Label>
                <Input type="time" value="08:00" readOnly />
              </div>
              <div>
                <Label>Time End</Label>
                <Input type="time" value="09:30" readOnly />
              </div>
              <div>
                <Label>Available Room</Label>
                <Input placeholder="Enter room" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Exam */}
        <Card className="mt-3">
          <CardHeader>
            <p className="text-sm font-semibold text-green-600">Assigned Exam</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">No Schedule Found.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
