import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  // const events = useLoaderData();
  const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

// this loader function is NOT a react component => NO hooks
// any other browser features can be used
export async function eventsLoader() {
  // fetch function returns a Promise, that resolves to a Response
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" };
    // throw new Response(JSON.stringify({ message: "Coult not fetch events." }), {
    //   status: 500,
    // });
    throw json({ message: "Coult not fetch events." }, { status: 500 });
  } else {
    // const resData = await response.json();
    // return resData.events; // this is from backend; so that is why it needs a . events

    // const res = new Response("any data", { status: 201 });
    // return res;
    return response;
  }
}
