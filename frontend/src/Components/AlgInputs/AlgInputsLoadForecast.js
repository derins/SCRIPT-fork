import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { dataLoadForecast } from "../Api/AlgorithmData";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    root: {
        width: 500,
        marginLeft: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function AlgInputsLoadForecast (props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    /* TODO save results(profile) of Load Forecast*/
    const saveResults = () => {
        setOpen(false);

        // TODO: backend
        // POST data to save as a profile
    };

    /* TODO change default parameters of Load Controll */
    const changeDefaultParameters = async () => {
        // TODO: backend * 3
        // Get default parameter set
    };
    
    // TODO: backend
    const getResult = async () => {
        var county = document.getElementById("standart-county").value;
        console.log(county);
        const res = await axios.get("http://127.0.0.1:8000/api/algorithm/load_forecast/?"+"county="+county);
        // console.log(res.data);
        const dataLoadForecast = [];
        for (var i = 0; i < res.data.length; i++) {
            const  dataLoadForecastUnit = {residential_l1_load: "", residential_l2_load: "", residential_mud_load: "", work_load: "", fast_load: "", public_l2_load: "", total_load: ""};
            dataLoadForecastUnit.residential_l1_load = res.data[i].residential_l1_load;
            dataLoadForecastUnit.residential_l2_load = res.data[i].residential_l2_load;
            dataLoadForecastUnit.residential_mud_load = res.data[i].residential_mud_load;
            dataLoadForecastUnit.work_load = res.data[i].work_load;
            dataLoadForecastUnit.fast_load = res.data[i].fast_load;
            dataLoadForecastUnit.public_l2_load = res.data[i].public_l2_load;
            dataLoadForecastUnit.total_load = res.data[i].total_load;
            dataLoadForecast.push(dataLoadForecastUnit);
        }
        // console.log(dataLoadForecast);
        return dataLoadForecast;
    };
      
    const runAlgorithm = async () => {
        setOpen(true);
        props.visualizeResults(await getResult());
    };

    const counties = [
        {
            name: "Santa Clara",
            residents: "1",
        },
        {
            name: "Santa Cruz",
            residents: "2",
        },
        {
            name: "San Francisco",
            residents: "3",
        },
        {
            name: "San Diego",
            residents: "4",
        },
    ];
  
    return (
        <>
            <TextField
                id="standart-county"
                select
                className={classes.textField}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                helperText="Please select a county"  
                margin="normal"
            >
                {counties.map(option => (
                    <option value={option.name}>
                        {option.name}
                    </option>
                ))}
            </TextField>
            <br />
            <Button variant="contained" className={classes.button} onClick={changeDefaultParameters}>
                    Default parameters
            </Button>
            <br/>
            <TextField
                disabled
                id="standard-aggregation_level"
                label="aggregation_level"
                defaultValue="defaulValue"
                className={classes.textField}
                margin="normal"
            />
            <TextField
                disabled
                id="standard-num_evs"
                label="num_evs"
                defaultValue="defaulValue"
                className={classes.textField}
                margin="normal"
            />
            <TextField
                disabled
                id="standard-fast_percent"
                label="fast_percent"
                defaultValue="defaulValue"
                className={classes.textField}
                margin="normal"
            />
            <TextField
                disabled
                id="standard-work_percent"
                label="work_percent"
                defaultValue="defaulValue"
                className={classes.textField}
                margin="normal"
            />
            <TextField
                disabled
                id="standard-res_percent"
                label="rate_res_percent"
                defaultValue="defaulValue"
                className={classes.textField}
                margin="normal"
            />
            <TextField
                disabled
                id="standard-l1_percent"
                label="l1_percent"
                defaultValue="defaulValue"
                className={classes.textField}
                margin="normal"
            />
            <TextField
                disabled
                id="standard-public_l2_percen"
                label="public_l2_percen"
                defaultValue="defaulValue"
                className={classes.textField}
                margin="normal"
            />
            <p/>
            <Button variant="contained" color="primary" className={classes.button} onClick={runAlgorithm}>
                Run
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Save</DialogTitle>
                <DialogContent>
                    <DialogContentText>
        To save the results of Load Forecast for Cost Benefit Analysis, please enter your profile name.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="profile_name"
                        label="Profile Name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
        Cancel
                    </Button>
                    <Button onClick={saveResults} color="primary">
        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AlgInputsLoadForecast;