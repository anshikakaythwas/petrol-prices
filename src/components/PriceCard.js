import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PriceCard = () => {
  const classes = useStyles();

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://newsrain-petrol-diesel-prices-india-v1.p.rapidapi.com/capitals/history",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "newsrain-petrol-diesel-prices-india-v1.p.rapidapi.com",
        "x-rapidapi-key": "97d22e9267msh175e0d29de09121p140dd5jsn4b17b5cdccd0",
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Petrol
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="h5" component="h2">
          Diesel
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PriceCard;
