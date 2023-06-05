import React, { useEffect, useState } from "react";
import Classes from "./Header.module.css";

const Header = (props) => {
  const [menuSelected, setMenu] = useState();

  useEffect(() => {
    switch (props.meal) {
      case "Dinner":
        setMenu(Classes.Dinner);
        break;
      case "Breakfast":
        setMenu(Classes.Breakfast);
        break;
      case "Dessert":
        setMenu(Classes.Dessert);
        break;
      default:
        break;
    }
  }, [props.meal]);

  return (
    <section className={`${menuSelected}`}>
      <div className={`${Classes.description} d-none d-md-flex`}>
        <h1 className="mb-5 text-success">DELICIOUS FOOD DELIVERED TO YOU</h1>
        <div className="d-none d-lg-flex">
          <p className="m-1">
            Choose your favourite meal from our borad seletion of available
            meals and enjoy a delivious lunch or dinner at home.
          </p>
          <p className="m-1">
            All our meals are cooked with high-quality ingredients, just-in-time
            and of course by experienced chef!
          </p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Header);
