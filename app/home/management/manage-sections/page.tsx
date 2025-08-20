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

export default function ManageSections() {
  const [sections, setSections] = useState([
    { level: "College", grade: "1st Year", name: "BSIT101A" },
    { level: "College", grade: "2nd Year", name: "BSIT201B" },
  ]);
  const [output, setOutput] = useState<string>("");

  const handleAction = (action: string, sectionName?: string) => {
    setOutput(`Action: ${action}${sectionName ? ` on ${sectionName}` : ""}`);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Add Section */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Add Section
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Education Level */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Education Level
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="senior-high">Senior High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grade Level */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Grade Level
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                  <SelectItem value="3rd">3rd Year</SelectItem>
                  <SelectItem value="4th">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Section Name
              </label>
              <Input placeholder="BSIT302A" className="w-full" />
            </div>

            {/* Add Button */}
            <div>
              <Button
                onClick={() => handleAction("Added new section")}
                className="bg-blue-600 hover:bg-blue-700 w-full text-white rounded-lg shadow"
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manage Section */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Manage Section
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Education Level */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Education Level
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="senior-high">Senior High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grade Level */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Grade Level
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                  <SelectItem value="3rd">3rd Year</SelectItem>
                  <SelectItem value="4th">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Section Name
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((s, idx) => (
                    <SelectItem key={idx} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => handleAction("Search executed")}
                className="bg-blue-600 hover:bg-blue-700 flex-1 text-white rounded-lg shadow"
              >
                Search
              </Button>
              <Button
                onClick={() => handleAction("Edit executed")}
                className="bg-green-600 hover:bg-green-700 flex-1 text-white rounded-lg shadow"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleAction("Delete executed")}
                className="bg-red-600 hover:bg-red-700 flex-1 text-white rounded-lg shadow"
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Section List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((s, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <Input value={s.level} readOnly className="bg-gray-100" />
                <Input value={s.grade} readOnly className="bg-gray-100" />
                <Input value={s.name} readOnly className="bg-gray-100" />
              </div>
            ))}
          </div>

          {/* Output Section */}
          {output && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 font-medium">
              {output}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
