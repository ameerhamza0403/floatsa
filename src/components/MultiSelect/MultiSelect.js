import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: '100%',
    maxWidth: '100%',
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{props.name}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple

          value={props.value}
          onChange={props.handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => {
            console.log(selected);
            return (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    className={classes.chip}
                  />
                ))}
              </div>
            );
          }}
          MenuProps={MenuProps}
        >
          {props.options.map((e) => (
            <MenuItem
              key={e.value}
              value={e.value}
              style={getStyles(e.label, props.value, theme)}
            >
              {e.lable}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
