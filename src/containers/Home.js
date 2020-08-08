import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    color: "#FF4442",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <h2 className={classes.heading}>Fuel Prices</h2>
    </>
  );
};

export default Home;
