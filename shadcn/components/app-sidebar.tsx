"use client";

import * as React from "react";
import {
  LayoutDashboard,
  LogOut,
  School,
  WandSparkles,
  ClockPlus,
  UserPen,
  Ticket,
  NotebookPen,
  Sparkles,
  Settings,
  NotebookText,
  Grid2X2Plus,
  BarChart3,
  Users,
  BookOpen,
  Building,
  GraduationCap,
  Calendar,
  CalendarDays,
  Zap,
  Megaphone,
} from "lucide-react";

import { NavGroup } from "./nav-group";
import { Sidebar, SidebarContent } from "@/shadcn/components/ui/sidebar";

const data = {
  navGroup: [
    {
      category: "OVERVIEW",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Class Schedule",
          url: "#",
          icon: BarChart3,
        },
      ],
    },
    {
      category: "SETUP",
      items: [
        {
          title: "Manage Department",
          url: "#",
          icon: Building,
        },
        {
          title: "Manage Courses",
          url: "#",
          icon: GraduationCap,
        },
        {
          title: "Manage Subjects",
          url: "/dashboard/manage-subjects",
          icon: BookOpen,
        },
        // idk if im gonna add "manage semesters"
        // wala  ko maisip, miss ko na baby q
        /* 
        manage semesters, can add/edit/delete or set to active/inactive,
        if 1 semester is set to active, then it will show specific data for that sem,
        only 1 can be set to active, it will automatically set other sem to inactive,
        waaahhh di ko pa sure kung pano magiging function sa backend since seperate data per sem
        naiiyak na ko
        */
      ],
    },
    {
      category: "MANAGEMENT",
      items: [
        {
          title: "Manage Instructors",
          url: "/dashboard/manage-instructors",
          icon: Users,
        },
        {
          title: "Manage Rooms",
          url: "/dashboard/manage-rooms",
          icon: School,
        },
        {
          title: "Manage Sections",
          url: "/dashboard/manage-sections",
          icon: GraduationCap,
        },
      ],
    },
    {
      category: "ASSIGNMENT",
      items: [
        {
          title: "Subject Assigning",
          url: "/dashboard/subject-assigning",
          icon: NotebookText,
        },

        {
          title: "Instructor Assigning",
          url: "/dashboard/instructor-scheduling",
          icon: Calendar,
        },
        {
          title: "Auto Assign Instructor",
          url: "#",
          icon: Zap,
        },
        {
          title: "Exam Assigning",
          url: "/dashboard/exam-assigning",
          icon: Ticket,
        },
      ],
    },
    {
      category: "SCHEDULING",
      items: [
        {
          title: "Subject Scheduling",
          url: "/dashboard/subject-scheduling",
          icon: CalendarDays,
        },
        {
          title: "Auto Class Schedule",
          url: "#",
          icon: Zap,
        },
        {
          title: "Custom Scheduling",
          url: "/dashboard/custom-scheduling",
          icon: Sparkles,
        },
      ],
    },
    {
      category: "ANNOUNCEMENT",
      items: [
        {
          title: "Post News / Events",
          url: "#",
          icon: Megaphone,
        },
        // my idea here is to post events/news/etc...
        // for example, i want to send an event notif, i can write when and where there
        // hirap mag english
        // then makikita ng teachers or kung sino mn pumunta sa website 
      ],
    },
    {
      category: "SYSTEM",
      items: [
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
        },
        {
          title: "Log Out",
          url: "#",
          icon: LogOut,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavGroup data={data.navGroup} />
      </SidebarContent>
    </Sidebar>
  );
}
