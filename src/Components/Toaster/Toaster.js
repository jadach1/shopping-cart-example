import {useState} from 'react'
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from "react-bootstrap";

const Toaster = (props) => {
const [show, setShow] = useState(true);

  return (
      <ToastContainer className="p-3" position='top-center'>
        <Toast delay="3000" autohide={true} show={show} animation={true} onClose={ () => {setShow(!show)}}>
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </ToastContainer>
  );
};

export default Toaster;
