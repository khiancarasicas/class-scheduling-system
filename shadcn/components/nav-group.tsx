"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavGroup({
  data,
}: {
  data: {
    category: string;
    items: {
      title: string;
      url: string;
      icon: LucideIcon;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return data.map((data) => (
    <SidebarGroup key={data.category}>
      <SidebarGroupLabel>{data.category}</SidebarGroupLabel>
      <SidebarMenu>
        {data.items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title} className={pathname == item.url ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium hover:bg-primary-accent hover:text-sidebar-primary-foreground" : "" }>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
