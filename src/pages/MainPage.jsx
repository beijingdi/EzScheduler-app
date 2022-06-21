import React, { useEffect, useState } from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import EventItem from "../components/EventItem/EventItem";
import Notification from "../components/Notification/Notification";
import classes_notification from "../components/Notification/Notification.module.css";
import classes_mainpage from "./MainPage.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = (props) => {
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [eventChange, setEventChange] = useState(false);
  const userId = props.cookies.user ? props.cookies.user.id : false;

  useEffect(() => {
    if (userId) {
      axios.get(`/event/all/${userId}`).then((d) => {
        setEvents(d.data);
      });
      setShowEvents(true);
      setEventChange(false);
    } else {
      setShowEvents(false);
      setEventChange(false);
    }
  }, [userId, props.cookies.user, eventChange]);

  // console.log(Date.now()/1000);
  const upcomingEvents = events
    .filter(
      (event) =>
        event.start_time - Date.now() / 1000 <= 388800 &&
        event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <UpcomingEvents
        key={event.event_id}
        eventId={event.event_id}
        description={event.description}
        start_time={event.start_time}
        end_time={event.end_time}
        title={event.title}
        date={event.start_time}
        address={event.address}
        lat={event.lat}
        long={event.long}
      />
    ));

  const acceptedEventsList = events
    .filter(
      (event) =>
        event.response === "yes" && event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const notRespondedEventsList = events
    .filter(
      (event) =>
        event.response === null && event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const maybeEventsList = events
    .filter(
      (event) =>
        event.response === "maybe" && event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const notificationList = events
    .filter(
      (event) =>
        event.response === null && event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <Notification
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        creator={event.creator}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const rejectedEventsList = events
    .filter(
      (event) =>
        event.response === "no" && event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  return (
    <>
      {showEvents && (
        <>
          {notificationList.length !== 0 && (
            <div className={classes_notification.container}>
              <h1 className={classes_mainpage.invite_sections}>Events You Have Not Responded</h1>
              {notificationList}
            </div>
          )}
          <Link to="/new">
            <Button>Create new event!</Button>
          </Link>
          <h1 className={classes_mainpage.invite_sections}>Upcoming Events</h1>
          {upcomingEvents.length === 0 && (
            <h1 className={classes_mainpage.invite_sections}>
              No upcoming events
            </h1>
          )}
          {upcomingEvents}

          {acceptedEventsList.length > 0 && (
            <h1 className={classes_mainpage.invite_sections}>
              My Accepted Events
            </h1>
          )}
          {acceptedEventsList}

          {(notRespondedEventsList.length > 0 ||
            maybeEventsList.length > 0) && (
            <h1 className={classes_mainpage.invite_sections}>Open Invites</h1>
          )}
          {notRespondedEventsList}
          {maybeEventsList}

          {rejectedEventsList.length > 0 && (
            <h1 className={classes_mainpage.invite_sections}>
              Declined Invites
            </h1>
          )}
          {rejectedEventsList}
        </>
      )}
      {!showEvents && (
        <div className={classes_mainpage.welcome}>
          <h1 className={classes_mainpage.title}>
            Welcome to{" "}
            <span className={classes_mainpage.app_name}>E.Z Scheduler</span>
          </h1>
          <h3>Please Login on the navigation bar to see Your Events</h3>
        </div>
      )}
    </>
  );
};

export default MainPage;
