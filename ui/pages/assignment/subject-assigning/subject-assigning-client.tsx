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
          <CardContent className="h-full max-h-[70vh] overflow-y-auto">
            {/* available subjects table */}
            <div className="h-svh"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Assigned Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full max-h-[70vh] overflow-y-auto">
            {/* assigned subjects table */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
