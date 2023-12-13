import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

interface Event {
  id: string;
  title: string;
  city: string;
  description: string;
  image: string;
  emails_registered: string[];
}

interface Data {
  events_categories: any[]; 
  allEvents: Event[]; 
}

function buildPath(): string {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath: string): Data {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data: Data = JSON.parse(jsonData);
  return data;
}

function writeDataToFile(filePath: string, newData: Data) {
  fs.writeFileSync(filePath, JSON.stringify(newData));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === "POST") {
    const { email, eventId } = body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const filePath: string = buildPath();
    const { events_categories, allEvents }: Data = extractData(filePath);

    if (!allEvents) {
      return res.status(404).json({
        status: 404,
        message: "Events data not found",
      });
    }

    const updatedAllEvents: Event[] = allEvents.map((ev) => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          return ev; 
        }
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev; 
    });

    const updatedData: Data = {
      events_categories,
      allEvents: updatedAllEvents,
    };

    writeDataToFile(filePath, updatedData);

    return res.status(201).json({
      message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
    });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
