import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function MaterialUIPickers(props) {
  // The first commit of Material-UI


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <div className='date'>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          className='makeStyles-formControl-118 MuiFormControl-fullWidth'
          margin="normal"
          id="date-picker-inline"
          label={props.title}
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          disablePast={props.disablePast}
        />
        </div >
    </MuiPickersUtilsProvider>
  );
}
