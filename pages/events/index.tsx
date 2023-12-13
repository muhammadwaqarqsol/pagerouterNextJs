import { GetStaticProps } from "next";
import AllEvents from "../../src/components/events/event-page";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  // Add other properties as needed
}

interface EventsPageProps {
  data: Event[];
}

const EventsPage: React.FC<EventsPageProps> = ({ data }) => {
  return <AllEvents data={data} />;
};

export default EventsPage;

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const { events_categories } = await import("../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
};
