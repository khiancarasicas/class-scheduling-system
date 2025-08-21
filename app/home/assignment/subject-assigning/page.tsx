"use client";

import React, { useState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

export default function SubjectAssigning() {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [lab, setLab] = useState("No");
  const [assignedSubjects, setAssignedSubjects] = useState<
    { name: string; lab: string }[]
  >([
    { name: "Integrative Programming", lab: "No" },
    { name: "Integrative Programming", lab: "Yes" },
  ]);

  const handleAdd = () => {
    if (selectedSubject) {
      setAssignedSubjects([...assignedSubjects, { name: selectedSubject, lab }]);
      setSelectedSubject("");
      setLab("No");
    }
  };

  const handleRemove = (index: number) => {
    setAssignedSubjects(assignedSubjects.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Select Section */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Select Section
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {/* Row: Education, Grade, Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Education Level */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Education Level
                </label>
                <Select onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="College">College</SelectItem>
                    <SelectItem value="Senior High">Senior High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grade Level */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Grade Level
                </label>
                <Select onValueChange={setSelectedGrade}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Section Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Section Name
                </label>
                <Select onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BSIT101A">BSIT101A</SelectItem>
                    <SelectItem value="BSIT201B">BSIT201B</SelectItem>
                    <SelectItem value="BSIT302A">BSIT302A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Small Search Button */}
            <div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded shadow">
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Assigning */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Subject Assigning
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Subjects to Assign */}
          <div>
            <div className="grid grid-cols-3 gap-4 items-end">
              {/* Subject Name */}
              <div className="col-span-2">
                <label className="block text-sm mb-1">Subject Name</label>
                <Select onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Systems Integration and Architecture">
                      Systems Integration and Architecture
                    </SelectItem>
                    <SelectItem value="Integrative Programming">
                      Integrative Programming
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lab + Add Button */}
              <div className="flex items-end gap-2">
                <div>
                  <label className="block text-sm mb-1">Lab</label>
                  <Select value={lab} onValueChange={setLab}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded shadow"
                  onClick={handleAdd}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Subjects Assigned */}
          <div>
  <h3 className="text-sm font-medium mb-3">Subjects Assigned</h3>
  <div className="space-y-3">
    {assignedSubjects.map((subj, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2"
      >
        <Input
          value={subj.name}
          readOnly
               className="bg-gray-100 text-sm flex-1"
                 />
               <Input
                  value={subj.lab}
                  readOnly
                    className="bg-gray-100 w-20 text-center text-sm"
                   />
                <Button
                    onClick={() => handleRemove(idx)}
                    className="bg-red-700 hover:bg-red-800 text-white text-sm px-4 py-1 rounded shadow w-[72px]"
                    >
                   -
                </Button>
              </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
