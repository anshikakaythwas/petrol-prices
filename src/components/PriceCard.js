import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { green, red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "block",
  },
  state: {
    padding: "2%",
  },
  pos: {
    marginBottom: 12,
  },
});

const PriceCard = ({ state, data }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid item container direction="row">
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs
          >
            <Typography variant="h5" component="h2">
              {state.title}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              {data && data.district}
            </Typography>
          </Grid>
          <Grid item xs>
            {data &&
              data.products.map((value, index) => {
                return (
                  <React.Fragment key={"price" + index}>
                    <Typography variant="h6" component="h3">
                      {value.productName}
                    </Typography>
                    <Typography component="h6" color="textSecondary">
                      {value.productPrice} {value.productCurrency}
                      {value.priceChangeSign === "+" ? (
                        <ArrowDropUpIcon
                          style={{
                            color: red["A700"],
                            verticalAlign: "middle",
                          }}
                        />
                      ) : (
                        <ArrowDropDownIcon
                          style={{
                            color: green[500],
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                      {value.priceChange}
                    </Typography>
                  </React.Fragment>
                );
              })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PriceCard;
