import React from "react";
import { useNavigate } from "react-router-dom";

export interface EventRowProps {
  id: number
  name: string;
  capacity: number;
  startDateTime: string;
}

export const EventRow = (props: EventRowProps) => {
  const navigate = useNavigate();

  const handleOnRowClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  }

  return (
    <tr onClick={() => handleOnRowClick(props.id)}>
      <td>{ props.name }</td>
      <td>{ props.capacity }</td>
      <td>{ props.startDateTime }</td>
    </tr>
  )
}
