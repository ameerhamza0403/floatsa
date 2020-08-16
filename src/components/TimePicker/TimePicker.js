import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          style={{width: '100%'}}
          label={props.title}
          value={props.value}
          onChange={props.handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
