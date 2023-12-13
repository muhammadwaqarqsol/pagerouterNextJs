import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface HomePageProps {
  data: Event[];
}

export const HomePage = ({ data }: HomePageProps) => (
  <div className="home_body">
    {data?.map((ev) => (
      <Link key={ev.id} href={`/events/${ev.id}`} passHref>
        <div className="card">
          <div className="image">
            <Image width={600} height={400} alt={ev.title} src={ev.image} />
          </div>
          <div className="content">
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
);
