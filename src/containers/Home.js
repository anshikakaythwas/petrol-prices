import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PriceCard from "../components/PriceCard";
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
      <Grid container justify="space-evenly">
        <Grid item>
          <PriceCard />
        </Grid>
        <Grid item>
          <PriceCard />
        </Grid>
        <Grid item>
          <PriceCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
