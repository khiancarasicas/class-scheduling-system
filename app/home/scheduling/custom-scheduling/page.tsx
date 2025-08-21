"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shadcn/components/ui/card";
import { Input } from "@/shadcn/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/shadcn/components/ui/select";
import { Button } from "@/shadcn/components/ui/button";
import { Separator } from "@/shadcn/components/ui/separator";
import { MainSection } from "@/ui/components/main-section";

const times = [
  "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM",
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Dashboard() {
  const [schedule, setSchedule] = useState<
    { grade: string; day: string; time: string; subject: string; section: string; teacher: string; lab: string }[]
  >([]);

  const [form, setForm] = useState({
    grade: "2nd Year",
    section: "BSIT2D/A",
    subject: "Integrative Programming",
    teacher: "Prof. Santos",
    lab: "No",
    day: "Mon",
    time: "8 AM",
  });

  const addSchedule = () => {
    setSchedule([...schedule, form]);
  };

  return (
    <MainSection>
      <Separator />

      {/* Create Schedule Form */}
      <MainSection.Section>
        <MainSection.Title>Create Schedule</MainSection.Title>
        <MainSection.Content>
          <Card className="mb-4">
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4 text-sm">
              
              {/* Year Level */}
              <div>
                <label className="block mb-1 font-medium">Year Level</label>
                <Select onValueChange={(val) => setForm({ ...form, grade: val })} defaultValue={form.grade}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Year Level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Section */}
              <div>
                <label className="block mb-1 font-medium">Section</label>
                <Input
                  className="h-9"
                  placeholder="Section Name"
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-1 font-medium">Subject</label>
                <Input
                  className="h-9"
                  placeholder="Subject Name"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              {/* Teacher */}
              <div>
                <label className="block mb-1 font-medium">Instructor</label>
                <Input
                  className="h-9"
                  placeholder="Instructor Name"
                  value={form.teacher}
                  onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                />
              </div>

              {/* Lab */}
              <div>
                <label className="block mb-1 font-medium">Lab</label>
                <Select onValueChange={(val) => setForm({ ...form, lab: val })} defaultValue={form.lab}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Lab" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Day */}
              <div>
                <label className="block mb-1 font-medium">Day</label>
                <Select onValueChange={(val) => setForm({ ...form, day: val })} defaultValue={form.day}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Day" /></SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time */}
              <div>
                <label className="block mb-1 font-medium">Time</label>
                <Select onValueChange={(val) => setForm({ ...form, time: val })} defaultValue={form.time}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Time" /></SelectTrigger>
                  <SelectContent>
                    {times.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Button - smaller and left aligned */}
              <div className="flex items-end">
                <Button 
                  onClick={addSchedule} 
                  className="h-8 px-3 text-xs"
                >
                  + Add to Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </MainSection.Content>
      </MainSection.Section>

      <Separator />

      {/* Schedule Table */}
      <MainSection.Section>
        <MainSection.Title>Weekly Schedule</MainSection.Title>
        <MainSection.Content>
          <Card>
            <CardHeader>
              <CardTitle>Class Timetable</CardTitle>
              <CardDescription>Displays the created class schedule</CardDescription>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-200 p-2 text-left">Time</th>
                    {days.map((day) => (
                      <th key={day} className="border border-gray-200 p-2 text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr key={time}>
                      <td className="border border-gray-200 p-2 font-medium">{time}</td>
                      {days.map((day) => {
                        const cell = schedule.find((s) => s.day === day && s.time === time);
                        return (
                          <td key={day} className="border border-gray-200 p-2 text-center align-top">
                            {cell ? (
                              <div className="bg-blue-100 text-blue-800 rounded p-2 shadow-sm text-left text-xs space-y-1">
                                <div><span className="font-semibold">Subject:</span> {cell.subject}</div>
                                <div><span className="font-semibold">Section:</span> {cell.section}</div>
                                <div><span className="font-semibold">Instructor:</span> {cell.teacher}</div>
                                <div><span className="font-semibold">Lab:</span> {cell.lab}</div>
                                <div><span className="font-semibold">Year:</span> {cell.grade}</div>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
