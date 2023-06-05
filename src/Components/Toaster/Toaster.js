import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";

//Style
import classes from "./Toaster.module.css";

//import icon
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegLaughSquint } from "react-icons/fa";

/*GENERATES A TOAST POP UP*/

const Toaster = (props) => {
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const [icon, setIcon] = useState("");

  //Will update the Toast Class, Colour and Icon to be displayed
  useEffect(() => {
    if (
      props.payload.title.trim() !== "" ||
      props.payload.message.trim() !== "" ||
      props.payload.type.trim() !== ""
    ) {
      setTitle(props.payload.title);
      setMsg(props.payload.message);

      switch (props.payload.type) {
        case "green":
          setType(classes.green);
          setIcon(<FaRegThumbsUp color="black" size="2rem" />);
          break;
        case "submit":
          setType(classes.blue);
          setIcon(<FaRegLaughSquint color="black" size="2rem" />);
          break;
        default:
          setType(classes.red);
          setIcon(<FaRegThumbsDown color="black" size="2rem" />);
          break;
      }
    }
  }, [props]);

  // Resets all the values
  const onCloseHandler = () => {
    setShow(!show);
    setTitle("");
    setMsg("");
    setType("");
    setIcon("");
    props.closed(); //callback function to parent
  };

  return (
    <ToastContainer position="relative" className="p-3">
      <Toast
        delay="2000"
        autohide={true}
        show={show}
        animation={true}
        onClose={onCloseHandler}
      >
        <Toast.Header className={type} closeButton={true}>
          <strong className="me-auto">{title}</strong>
          <small>{icon}</small>
        </Toast.Header>
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default React.memo(Toaster);
