import { Button } from "react-bootstrap";

const MyButton = (props) => {
   
  return (
    <Button
      onClick={props.onClick}
      type={props.type}
      className={`${props.classes} `} 
      disabled={props.disabled}
    >
      {props.title}
    </Button>
  );
};

export default MyButton;
