"use client";

import { useState } from "react";
import { Edit, Trash2, PlusIcon } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";

const ROOMS = [
  { room: "201", building: "Lecture", type: "Classroom", status: "Available" },
  { room: "Lab A", building: "Laboratory", type: "Laboratory", status: "Available" },
  { room: "305", building: "Lecture", type: "Classroom", status: "Available" },
  { room: "Lab b", building: "Laboratory", type: "Computer Lab", status: "Maintenance" },
  { room: "302", building: "Lecture", type: "Classroom", status: "Available" },
];

const statusClass = (status: string) =>
  status === "Available"
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-500";

export default function RoomsTable() {
  const [search, setSearch] = useState("");

  const filteredRooms = ROOMS.filter(
    (room) =>
      room.room.toLowerCase().includes(search.toLowerCase()) ||
      room.building.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm text-sm"
        />
        <Button>
          <PlusIcon className="-ms-1 opacity-60" size={16} />
          Add Room
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-medium">Room</th>
              <th className="px-4 py-2 text-left font-medium">Building</th>
              <th className="px-4 py-2 text-left font-medium">Type</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.room} className="border-t">
                <td className="px-4 py-2 font-medium">{room.room}</td>
                <td className="px-4 py-2">{room.building}</td>
                <td className="px-4 py-2">{room.type}</td>
                <td className="px-4 py-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(room.status)}`}>
                    {room.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Button size="icon" variant="ghost" className="mr-2">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
            {filteredRooms.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}