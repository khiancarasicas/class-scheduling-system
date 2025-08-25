"use client";

import {
  DAYS_OF_WEEK,
  DEFAULT_END_HOUR,
  DEFAULT_START_HOUR,
  formatTime,
  timeToMinutes,
} from "@/lib/scheduleUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcn/components/ui/tooltip";
import { useState } from "react";

export default function Timetable() {
  const [timeRange] = useState({
    start: DEFAULT_START_HOUR,
    end: DEFAULT_END_HOUR,
  });

  const CELL_CLASSNAME =
    "absolute bg-primary text-primary-foreground p-2 rounded text-xs overflow-hidden hover:opacity-90 transition-opacity border";

  const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Generate time slots
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = timeRange.start; hour <= timeRange.end; hour++) {
      if (hour === timeRange.end) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
        break;
      }
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:15`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
      slots.push(`${hour.toString().padStart(2, "0")}:45`);
    }
    return slots;
  };

  const getScheduleStyle = (startTime: string, endTime: string) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const duration = endMinutes - startMinutes;

    const startHourMinutes = timeRange.start * 60;
    const topPosition = ((startMinutes - startHourMinutes) / 15) * 2;
    const height = (duration / 15) * 2;

    return {
      top: `${topPosition}rem`,
      height: `${height}rem`,
      left: "0.5rem",
      right: "0.5rem",
    };
  };

  const timeSlots = generateTimeSlots();

  return (
    <>
      {/* Header row */}
      <div className="grid grid-cols-8 border-b">
        <div className="border-r bg-muted/50 p-4 font-medium">Time</div>
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="border-r last:border-r-0 bg-muted/50 p-4 font-medium text-center"
          >
            <div>{day}</div>
            <div className="text-xs text-muted-foreground mt-1">classes</div>
          </div>
        ))}
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-8 relative min-h-96">
        {/* Time slots column */}
        <div className="border-r">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-8 border-b flex items-center px-4 text-sm text-muted-foreground"
            >
              {formatTime(time)}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="border-r last:border-r-0 relative">
            {timeSlots.map((time) => (
              <div
                key={`${day}-${time}`}
                className="h-8 border-b hover:bg-muted/30 relative"
              />
            ))}

            {/* Dummy schedule block */}
            {day === "Monday" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute bg-primary text-primary-foreground p-2 rounded text-xs overflow-hidden hover:opacity-90 transition-opacity border"
                    style={getScheduleStyle("8:00", "9:00")}
                  >
                    <div className="text-xs opacity-75">8:00 AM - 9:00 AM</div>
                    <div className="font-medium truncate">TEST SUBJECT</div>
                    <div className="text-xs opacity-90 truncate">BSIT401B</div>
                    <div className="text-xs opacity-90 truncate">
                      Prof. Kyla
                    </div>
                    <div className="text-xs opacity-90 truncate">Room 9999</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  8:00 AM - 9:00 AM | TEST SUBJECT | BSIT401B | Room 9999
                </TooltipContent>
              </Tooltip>
            )}
            {day === "Wednesday" && (
              <div
                className={CELL_CLASSNAME}
                style={getScheduleStyle("7:00", "8:30")}
              >
                <div className="text-xs opacity-75">7:00 AM - 8:30 AM</div>
                <div className="font-medium truncate">TEST SUBJECT</div>
                <div className="text-xs opacity-90 truncate">BSIT401B</div>
                <div className="text-xs opacity-90 truncate">Prof. Anje</div>
                <div className="text-xs opacity-90 truncate">Room 9999</div>
              </div>
            )}

            {day === "Monday" && (
              <div
                className={CELL_CLASSNAME}
                style={getScheduleStyle("9:00", "10:30")}
              >
                <div className="text-xs opacity-75">9:00 AM - 10:30 AM</div>
                <div className="font-medium truncate">TEST SUBJECT</div>
                <div className="text-xs opacity-90 truncate">BSIT401B</div>
                <div className="text-xs opacity-90 truncate">Prof. Jumar</div>
                <div className="text-xs opacity-90 truncate">Room 9999</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
