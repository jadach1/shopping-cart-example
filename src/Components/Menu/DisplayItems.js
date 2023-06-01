import classes from './Menu.module.css'

const DisplayItems = (props) => {
  return (
    <>
      <div className={classes.displayItem}>
        <h3 >{props.item.name}</h3>
        <p className="text-muted">{props.item.description}</p>
        <h2 className="text-danger">${props.item.price.toFixed(2)}</h2>
      </div>
    </>
  );
};

export default DisplayItems;
