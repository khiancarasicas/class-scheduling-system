// ui/pages/assignment/subject-assigning/subject-assigning-client.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shadcn/components/ui/card";
import SelectSection from "./select-section";
// import AvailableSubjectsTable from "./test-available-subjects-table";
import AvailableSubjectsTable from "./available-subjects-table";
import AssignedSubjectsTable from "./assigned-subjects-table";
// import AssignedSubjectsTable from "./test-2-assigned-subjects-table";
// import AssignedSubjectsTable from "./test-assigned-subjects-table";

export default function SubjectAssigningClient() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-card-foreground">Select Section</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectSection onSectionChange={setSelectedSection} />
          {selectedSection && (
            <p className="mt-2 text-sm text-gray-700">
              Selected Section ID: {selectedSection}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Available Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full max-h-[70vh] overflow-y-auto py-4 border-y">
            {/* available subjects table */}
            <AvailableSubjectsTable selectedSection={selectedSection!} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Assigned Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full max-h-[70vh] overflow-y-auto py-4 border-y">
            {/* assigned subjects table */}
            <AssignedSubjectsTable selectedSection={selectedSection!} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
