"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shadcn/components/ui/card";
import SelectSection from "../../../components/select-section";
import { UnscheduledSubjectsTable } from "./unscheduled-subjects-table";
import { ScheduledSubjectsTable } from "./scheduled-subjects-table";

export default function SubjectSchedulingClient() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-card-foreground">Select Section</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectSection onSectionChange={setSelectedSection} />
        </CardContent>
      </Card>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Unscheduled Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[70vh] max-h-[70vh] overflow-y-auto py-4 border-y">
            {selectedSection ? (
              <UnscheduledSubjectsTable
                selectedSection={selectedSection!}
                onChange={triggerRefresh}
                refreshKey={refreshKey}
              />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Select a section...
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Scheduled Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[70vh] max-h-[70vh] overflow-y-auto py-4 border-y">
            {selectedSection ? (
              <ScheduledSubjectsTable
                selectedSection={selectedSection!}
                onChange={triggerRefresh}
                refreshKey={refreshKey}
              />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Select a section...
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
