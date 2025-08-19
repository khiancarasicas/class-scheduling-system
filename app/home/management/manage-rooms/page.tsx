"use client";
import { MainSection } from "@/ui/components/main-section";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const ROOMS = [
  {
    room: "201",
    building: "Lecture",
    type: "Classroom",
    capacity: 30,
    equipment: ["Projector", "Whiteboard"],
    status: "Available",
  },
  {
    room: "Lab A",
    building: "Laboratory",
    type: "Laboratory",
    capacity: 25,
    equipment: [" Computers"],
    status: "Available",
  },
  {
    room: "305",
    building: "Lecture",
    type: "Classroom",
    capacity: 40,
    equipment: ["Sound System", "Projector"],
    status: "Available",
  },
  {
    room: "Lab b",
    building: "Laboratory",
    type: "Computer Lab",
    capacity: 20,
    equipment: [" Computers",],
    status: "Maintenance",
  },
  {
    room: "302",
    building: "Lecture",
    type: "Classroom",
    capacity: 35,
    equipment: ["Whiteboard", "TV Display"],
    status: "Available",
  },
];

const statusClass = (status: string) =>
  status === "Available"
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-500";

export default function ManageRooms() {
  const [search, setSearch] = useState("");

  const filteredRooms = ROOMS.filter(
    (room) =>
      room.room.toLowerCase().includes(search.toLowerCase()) ||
      room.building.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Manage Rooms</MainSection.Title>
        <MainSection.Content>
          {/* Search */}
          <div className="mb-6 rounded-xl bg-white p-6 shadow">
            <label className="block text-xl font-semibold mb-2">
              Search Rooms
            </label>
            <p className="text-gray-500 mb-4">
              Find rooms by number, building, or type
            </p>
            <input
              type="text"
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Rooms List */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-xl font-semibold">Rooms List</span>
                <span className="ml-3 text-gray-500 text-sm">
                  Total: {filteredRooms.length} rooms
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 font-semibold">Room</th>
                    <th className="py-2 pr-4 font-semibold">Building</th>
                    <th className="py-2 pr-4 font-semibold">Type</th>
                    <th className="py-2 pr-4 font-semibold">Capacity</th>
                    <th className="py-2 pr-4 font-semibold">Equipment</th>
                    <th className="py-2 pr-4 font-semibold">Status</th>
                    <th className="py-2 pr-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.room} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm font-semibold">
                          {room.room}
                        </span>
                      </td>
                      <td className="py-3 pr-4">{room.building}</td>
                      <td className="py-3 pr-4">{room.type}</td>
                      <td className="py-3 pr-4">{room.capacity}</td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-2">
                          {room.equipment.map((eq) => (
                            <span
                              key={eq}
                              className="rounded bg-gray-100 px-2 py-0.5 text-xs"
                            >
                              {eq}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                            room.status
                          )}`}
                        >
                          {room.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <button
                            className="rounded border border-gray-200 p-2 hover:bg-gray-100"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            className="rounded border border-gray-200 p-2 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRooms.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">
                        No rooms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
} 