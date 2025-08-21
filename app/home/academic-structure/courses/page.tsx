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

export default function Courses() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [department, setDepartment] = useState("");
  const [duration, setDuration] = useState("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<
    { code: string; name: string; department: string; duration: string }[]
  >([
    { code: "BSIT", name: "Information Technology", department: "Computing", duration: "4" },
    { code: "BSTM", name: "Tourism Management", department: "Hospitality", duration: "4" },
  ]);

  const handleAddCourse = () => {
    if (courseCode && courseName && department && duration) {
      setCourses([
        ...courses,
        { code: courseCode, name: courseName, department, duration },
      ]);
      setCourseCode("");
      setCourseName("");
      setDepartment("");
      setDuration("");
    }
  };

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleCourseCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      setCourseCode(value);
    }
  };

  const handleCourseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setCourseName(value);
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setDuration(value);
    }
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <Card className="shadow-md rounded-xl">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Course Management
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 space-y-6">
          {/* --- Add Course Form --- */}
          <div>
            <h3 className="text-md font-semibold text-green-600 mb-2">
              Add New Course
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Course Code (e.g. BSIT)"
                value={courseCode}
                onChange={handleCourseCodeChange}
              />
              <Input
                placeholder="Course Name"
                value={courseName}
                onChange={handleCourseNameChange}
              />
              <Input
                placeholder="Department (e.g. Hospitality)"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <Input
                placeholder="Duration (Years)"
                value={duration}
                onChange={handleDurationChange}
              />
            </div>
            <div className="flex justify-end mt-3">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded shadow text-sm"
                onClick={handleAddCourse}
              >
                Save
              </Button>
            </div>
          </div>

          {/* --- Course List / Search --- */}
          <div>
            <h3 className="text-md font-semibold text-blue-600 mb-2">
              Course List
            </h3>

            {/* Search */}
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-2"
            />

            {/* Courses Table */}
            <div className="overflow-x-auto border rounded-md shadow-sm">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-left text-gray-700">
                    <th className="p-2 border">Code</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Department</th>
                    <th className="p-2 border text-center">Duration</th>
                    <th className="p-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="p-2 border font-medium">{course.code}</td>
                      <td className="p-2 border">{course.name}</td>
                      <td className="p-2 border">{course.department}</td>
                      <td className="p-2 border text-center">
                        {course.duration} yrs
                      </td>
                      <td className="p-2 border text-center">
                        <Button
                          onClick={() => handleRemoveCourse(idx)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-2 text-center text-gray-500">
                        No courses found.
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
