import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, TextField } from "@material-ui/core";
import PriceCard from "../components/PriceCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    padding: "3%",
  },
  root: {
    flexGrow: 1,
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);
  const [data, setData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [districtsData, setDistrictsData] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [district, setDistrict] = useState(null);
  const [districtDDOpen, setDistrictDDOpen] = useState(false);
  const [stateDDOpen, setStateDDOpen] = useState(false);

  const handleOnChangeOfStates = (e, value) => {
    value && setState(value);
    setDistrictDDOpen(true);
    setStateDDOpen(false);
  };
  const handleOnChangeOfDistricts = (e, value) => {
    value && setDistrict(value);
    setDistrictDDOpen(false);
  };

  const clearDistricts = () => {
    setDistrictsData([]);
    setDistrict(null);
    setData([]);
    setStateDDOpen(true);
  };

  //Load the price for the State+District combo
  useEffect(() => {
    async function getPricesForState() {
      if (state && district) {
        setLoading(true);
        var url = `https://fuelprice-api-india.herokuapp.com/price/${state.id}/${district.id}`;

        if (district.id === "All")
          url = `https://fuelprice-api-india.herokuapp.com/price/${state.id}`;

        const data = await axios.get(url);
        setData(data.data);
        setLoading(false);
      }
    }
    state && district && getPricesForState();
  }, [district, state]);

  //Load all states
  useEffect(() => {
    async function getStatesData() {
      setLoadingStates(true);
      const data = await axios.get(
        "https://fuelprice-api-india.herokuapp.com/states"
      );
      var modifiedData = Object.keys(data.data).map((key) => {
        return {
          id: data.data[key],
          title: data.data[key].split("-").join(" "),
        };
      });
      setStatesData(modifiedData);
      setLoadingStates(false);
      setStateDDOpen(true);
    }

    getStatesData();
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //Load Districts corresponding to the state
  useEffect(() => {
    async function getDistrictsData() {
      setLoadingDistricts(true);
      const data = await axios.get(
        `https://fuelprice-api-india.herokuapp.com/${
          state && state.id
        }/districts`
      );

      var modifiedData = Object.keys(data.data).map((key) => {
        return {
          id: data.data[key],
          title: capitalizeFirstLetter(
            data.data[key]
              .split("-")
              .join(" ")
              .split("+")
              .join(" ")
              .toLowerCase()
          ),
        };
      });
      if (modifiedData.length > 1) {
        modifiedData.push({ id: "All", title: "All" });
        modifiedData.sort(function (a, b) {
          return a.title === "All"
            ? -1
            : a.title < b.title
            ? -1
            : a.title > b.title
            ? 1
            : 0;
        });
      }

      setDistrictsData(modifiedData);
      setLoadingDistricts(false);
      if (modifiedData.length === 1) {
        setDistrict(modifiedData[0]);
        setDistrictDDOpen(false);
      }
    }

    state && getDistrictsData();
  }, [state]);

  return (
    <>
      <Paper>
        <div className={classes.root}>
          <Typography variant="h3" className={classes.heading}>
            Fuel Prices in India
          </Typography>
          <Grid container justify="space-around" alignItems="center">
            <Grid item container alignItems="center" justify="center" xs>
              <Autocomplete
                options={statesData}
                getOptionLabel={(option) => option.title}
                style={{ width: "80%", alignSelf: "center" }}
                loading={loadingStates}
                disabled={loadingStates}
                onChange={handleOnChangeOfStates}
                autoSelect
                openOnFocus
                onFocus={clearDistricts}
                onBlur={() => setStateDDOpen(false)}
                value={state}
                open={stateDDOpen}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="States"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingStates ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item container alignItems="center" justify="center" xs>
              <Autocomplete
                id="districts-combo"
                options={districtsData}
                getOptionLabel={(option) => option.title}
                loading={loadingDistricts}
                autoSelect
                value={district}
                disabled={loadingDistricts}
                open={districtDDOpen}
                onFocus={() => setDistrictDDOpen(true)}
                onBlur={() => setDistrictDDOpen(false)}
                onChange={handleOnChangeOfDistricts}
                style={{ width: "80%", alignSelf: "center" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Districts"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingDistricts ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid
            container
            spacing={3}
            direction="row"
            justify={data && data.length < 3 ? "space-around" : null}
            alignItems="flex-start"
          >
            {loading ? (
              <Grid item container xs alignItems="center" justify="center">
                <CircularProgress
                  color="inherit"
                  style={{ alignSelf: "center" }}
                />
              </Grid>
            ) : (
              data &&
              data.map((value, i) => {
                return (
                  <Grid item key={i} xs={11} sm={5} md={4} lg={3} xl={2}>
                    <PriceCard data={value} state={state} />
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      </Paper>
    </>
  );
};

export default Home;
