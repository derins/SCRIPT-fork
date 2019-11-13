import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
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

export default function Scenario1 (props) {
    const runAlgorithm = async () => {
        const respResults = await axios.get("http://127.0.0.1:8000/api/algorithm/load_controller/");
        
        let uncontrolledLoad = JSON.parse(respResults.data[0].uncontrolled_load);
        let controlledLoad = JSON.parse(respResults.data[0].controlled_load);

        console.log(uncontrolledLoad)
        console.log(controlledLoad)

        uncontrolledLoad = uncontrolledLoad.map((data, i) => (
            {
              x: i,
              y: parseFloat(data.load),
            }
        ))

        controlledLoad = controlledLoad.map((data, i) => (
            {
              x: i,
              y: parseFloat(data.load),
            }
        ))

        props.visualizeResults([{
          yAxis: 'Uncontrolled Load (kWh)',
          xAxis: 'Time',
          data: uncontrolledLoad,
        }, {
          yAxis: 'Controlled Load (kWh)',
          xAxis: 'Time',
          data: controlledLoad,
        }])
    };
  
    const classes = useStyles();
  
    return (
        <div>
            <form noValidate autoComplete="off">
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
                    helperText="Please select your county"  
                    margin="normal"
                >
                    {counties.map(option => (
                        <option key={option.name} value={option.residents}>
                            {option.name}
                        </option>
                    ))}
                </TextField>
                <p/>
                <Button variant="contained" color="primary" className={classes.button} onClick={runAlgorithm}>
                    Run
                </Button>
            </form>    
        </div>
    );
}