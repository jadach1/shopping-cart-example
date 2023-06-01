import React from "react";

const MessagingContext = React.createContext({
  message: { title: "", message: "", colour: "", icon: "" },
  show: false,
  newMessage: () => {},
});

export default MessagingContext;
