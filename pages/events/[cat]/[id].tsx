import { GetStaticPaths, GetStaticProps } from "next";
import SingleEvent from "../../../src/components/events/single-event";

interface Event {
  id: string;
  title: string;
  city: string;
  description: string;
  image: string;
  // Add other properties as needed
}

interface EventPageProps {
  data: Event;
}

const EventPage: React.FC<EventPageProps> = ({ data }) => (
  <SingleEvent data={data} />
);

export default EventPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { allEvents } = await import("@/data/data.json");

  const allPaths = allEvents.map((path: Event) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EventPageProps> = async (
  context
) => {
  const id = context.params?.id;
  const { allEvents }: { allEvents: Event[] } = await import(
    "@/data/data.json"
  );
  const eventData: Event | undefined = allEvents.find((ev) => id === ev.id);

  if (!eventData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: eventData },
  };
};
