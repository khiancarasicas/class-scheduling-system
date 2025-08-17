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
  MapPin,
} from "lucide-react";

import { NavGroup } from "./nav-group";
import { Sidebar, SidebarContent } from "@/shadcn/components/ui/sidebar";

const data = {
  navGroup: [
    {
      category: "MAIN",
      items: [
        {
          title: "Dashboard",
          url: "/home/main/dashboard",
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
      category: "ACADEMIC STRUCTURE",
      items: [
        {
          title: "Departments",
          url: "/home/academic-structure/departments",
          icon: Building,
        },
        {
          title: "Academic Levels",
          url: "#",
          icon: GraduationCap,
        },
        {
          title: "Courses",
          url: "#",
          icon: School,
        },
        {
          title: "Subjects",
          url: "#",
          icon: BookOpen,
        },
        // idk if im gonna add "manage semesters"
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
          url: "/home/management/manage-instructors",
          icon: Users,
        },
        {
          title: "Manage Rooms",
          url: "#",
          icon: MapPin,
        },
        {
          title: "Manage Sections",
          url: "#",
          icon: GraduationCap,
        },
      ],
    },
    {
      category: "ASSIGNMENT",
      items: [
        {
          title: "Subject Assigning",
          url: "#",
          icon: NotebookText,
        },

        {
          title: "Instructor Assigning",
          url: "#",
          icon: Calendar,
        },
        {
          title: "Auto Assign Instructor",
          url: "#",
          icon: Zap,
        },
        {
          title: "Exam Assigning",
          url: "#",
          icon: Ticket,
        },
      ],
    },
    {
      category: "SCHEDULING",
      items: [
        {
          title: "Subject Scheduling",
          url: "#",
          icon: CalendarDays,
        },
        {
          title: "Auto Class Schedule",
          url: "#",
          icon: Zap,
        },
        {
          title: "Custom Scheduling",
          url: "#",
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
          url: "/home/system/settings",
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
