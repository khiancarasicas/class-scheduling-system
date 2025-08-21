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

export default function Subjects() {
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [units, setUnits] = useState("");
  const [lab, setLab] = useState("No");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");

  const [subjects, setSubjects] = useState<
    { code: string; name: string; units: string; lab: string; course: string }[]
  >([
    {
      code: "IP101",
      name: "Integrative Programming",
      units: "3",
      lab: "Yes",
      course: "BSIT",
    },
    {
      code: "SIA201",
      name: "Systems Integration and Architecture",
      units: "3",
      lab: "No",
      course: "BSCS",
    },
  ]);

  const handleAddSubject = () => {
    if (subjectCode && subjectName && units && course) {
      setSubjects([
        ...subjects,
        { code: subjectCode, name: subjectName, units, lab, course },
      ]);
      setSubjectCode("");
      setSubjectName("");
      setUnits("");
      setLab("No");
      setCourse("");
    }
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  // --- Validation Handlers ---
  const handleSubjectCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      setSubjectCode(value);
    }
  };

  const handleSubjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setSubjectName(value);
    }
  };

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setUnits(value);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Subjects Management */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Subjects Management
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Add New Subject */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Subject Code</label>
              <Input
                placeholder="e.g. IP101"
                value={subjectCode}
                onChange={handleSubjectCodeChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Subject Name</label>
              <Input
                placeholder="e.g. Integrative Programming"
                value={subjectName}
                onChange={handleSubjectNameChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Units</label>
              <Input
                placeholder="e.g. 3"
                value={units}
                onChange={handleUnitsChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Laboratory</label>
              <Select value={lab} onValueChange={setLab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm mb-1">Course</label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BSIT">BSIT</SelectItem>
                  <SelectItem value="BSCS">BSCS</SelectItem>
                  <SelectItem value="BSECE">BSECE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded shadow w-full"
              onClick={handleAddSubject}
            >
              Add Subject
            </Button>
          </div>

          {/* Right: Subjects Table */}
          <div>
            <h3 className="text-sm font-medium mb-3">Subjects List</h3>
            <Input
              placeholder="Search subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <div className="overflow-x-auto border rounded-lg shadow-sm">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700">
                    <th className="p-2 border">Code</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Units</th>
                    <th className="p-2 border">Lab</th>
                    <th className="p-2 border">Course</th>
                    <th className="p-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-2 border">{subject.code}</td>
                      <td className="p-2 border">{subject.name}</td>
                      <td className="p-2 border text-center">{subject.units}</td>
                      <td className="p-2 border text-center">{subject.lab}</td>
                      <td className="p-2 border text-center">{subject.course}</td>
                      <td className="p-2 border text-center">
                        <Button
                          onClick={() => handleRemoveSubject(idx)}
                          className="bg-red-700 hover:bg-red-800 text-white text-xs px-3 py-1 rounded shadow"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredSubjects.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-3 text-center text-gray-500"
                      >
                        No subjects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
