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

export default function ManageRooms() {
  const [rooms, setRooms] = useState([
    { name: "LAB 1", lab: "Yes" },
    { name: "ROOM 1", lab: "No" },
    { name: "GYM 1", lab: "No" },
  ]);
  const [newRoom, setNewRoom] = useState("");
  const [newLab, setNewLab] = useState("No");
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();
  const [selectedLab, setSelectedLab] = useState<string | undefined>();
  const [output, setOutput] = useState<string>("");

  // Add new room
  const handleAddRoom = () => {
    if (!newRoom.trim()) return;
    setRooms([...rooms, { name: newRoom, lab: newLab }]);
    setOutput(`Added new room: ${newRoom} (Lab: ${newLab})`);
    setNewRoom("");
    setNewLab("No");
  };

  // Action handler
  const handleAction = (action: string) => {
    if (!selectedRoom) {
      setOutput("Please select a room first.");
      return;
    }
    setOutput(`${action} on ${selectedRoom} (Lab: ${selectedLab})`);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Add Room */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Add Room
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex gap-6 items-end">
            {/* Room Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Room Name
              </label>
              <Input
                placeholder="GYM 2"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                className="w-40"
              />
            </div>

            {/* Lab Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Lab
              </label>
              <Select
                value={newLab.toLowerCase()}
                onValueChange={(val) => setNewLab(val === "yes" ? "Yes" : "No")}
              >
                <SelectTrigger className="w-24 h-9">
                  <SelectValue placeholder="No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Add Button */}
            <div>
              <Button
                size="sm"
                onClick={handleAddRoom}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-9 px-4 text-sm"
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manage Rooms */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-blue-600 text-lg font-semibold">
            Manage Rooms
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Dropdowns */}
          <div className="flex gap-6 items-end">
            {/* Room Name Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Room Name
              </label>
              <Select
                value={selectedRoom}
                onValueChange={(val) => setSelectedRoom(val)}
              >
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room, i) => (
                    <SelectItem key={i} value={room.name}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Lab Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Lab
              </label>
              <Select
                value={selectedLab?.toLowerCase()}
                onValueChange={(val) =>
                  setSelectedLab(val === "yes" ? "Yes" : "No")
                }
              >
                <SelectTrigger className="w-24 h-9">
                  <SelectValue placeholder="No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Single Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="sm"
              onClick={() => handleAction("Search executed")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4"
            >
              Search
            </Button>
            <Button
              size="sm"
              onClick={() => handleAction("Edit executed")}
              className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4"
            >
              Edit
            </Button>
            <Button
              size="sm"
              onClick={() => handleAction("Delete executed")}
              className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4"
            >
              Delete
            </Button>
          </div>

          {/* Room List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rooms.map((r, idx) => (
              <div
                key={idx}
                className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center"
              >
                <span className="font-medium">{r.name}</span>
                <span className="text-sm text-gray-600">Lab: {r.lab}</span>
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
