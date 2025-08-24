export const minutesFromTime = (t: string) => {
  const [h, m] = t.split(":").map((x) => parseInt(x, 10));
  return h * 60 + m;
};

export const durationMinutes = (start: string, end: string) => {
  return minutesFromTime(end) - minutesFromTime(start);
};

export const isValidHalfHour = (t: string) => {
  const m = minutesFromTime(t) % 60;
  return m === 0 || m === 30;
};

export const overlaps = (
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string
) => {
  const s1 = minutesFromTime(aStart);
  const e1 = minutesFromTime(aEnd);
  const s2 = minutesFromTime(bStart);
  const e2 = minutesFromTime(bEnd);
  return Math.max(s1, s2) < Math.min(e1, e2);
};

export const toHours = (mins: number) => +(mins / 60).toFixed(2);

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
};
