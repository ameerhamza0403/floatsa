import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,
  },
  body: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'justify'
  },
}));

export default function SimpleExpansionPanel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.data.map((e) => (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {e.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={classes.body} >
              {e.description}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}
