import { GetStaticPaths, GetStaticProps } from "next";
import CatEvent from "../../../src/components/events/catEvent";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  city: string;
}

interface EventsCatPageProps {
  data: Event[];
  pageName: string;
}

const EventsCatPage: React.FC<EventsCatPageProps> = ({ data, pageName }) => (
  <CatEvent data={data} pageName={pageName} />
);

export default EventsCatPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { events_categories } = await import("@/data/data.json");
  const allPaths = events_categories.map((ev: { id: string }) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EventsCatPageProps> = async (
  context
) => {
  const id = context.params?.cat as string;
  const { allEvents }: { allEvents: Event[] } = await import(
    "@/data/data.json"
  );

  const data = allEvents.filter((ev) => ev.city === id);

  return { props: { data, pageName: id || "" } };
};
