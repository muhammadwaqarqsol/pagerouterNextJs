import { useRouter } from "next/router";
import React, { useRef, useState, FormEvent } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface SingleEventProps {
  data: Event;
}

const SingleEvent: React.FC<SingleEventProps> = ({ data }) => {
  const inputEmail = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputEmail.current) return;

    const emailValue = inputEmail.current.value;
    const eventId = router.query.id as string | undefined;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage("Please introduce a correct email address");
      return;
    }

    try {
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, eventId }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const responseData = await response.json();
      setMessage(responseData.message);
      if (inputEmail.current) {
        inputEmail.current.value = "";
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <div className="event_single_page">
      <h1>{data.title}</h1>
      <img src={data.image} width={1000} height={500} alt={data.title} />
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label>Get Registered for this event!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;
