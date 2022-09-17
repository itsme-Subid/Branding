import React from "react";

function Notification(props) {
  return <div className="notification">
    <div className="notification__content">
      <h1 className="notification__title">{props.title}</h1>
    </div>
  </div>;
}

export default Notification;
