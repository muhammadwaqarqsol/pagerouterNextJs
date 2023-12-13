import React from "react";
import Image from "next/image";
import Link from "next/link";
interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface AllEvents {
  data: Event[];
}

const AllEvents = ({ data }: AllEvents) => {
  return (
    <div className="events_page">
      {data?.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`} passHref>
          <div className="card">
            <Image src={ev.image} alt={ev.title} width={500} height={500} />{" "}
            <h2>{ev.title} </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllEvents;
