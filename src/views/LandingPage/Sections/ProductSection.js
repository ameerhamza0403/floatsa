import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Map from "@material-ui/icons/Room";
import EmojiPeople from "@material-ui/icons/EmojiPeople";
import Rowing from "@material-ui/icons/Rowing";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>It's soo Easy :)</h2>
          <h5 className={classes.description}>
            3 simple steps to a comfortable boat journey
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Find a Location"
              description="Select destination, define your requirements and book in few clicks."
              icon={Map}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Select a Boat Owner"
              description="Select the boat owner communicate your rate and finnalize"
              icon={EmojiPeople}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Enjoy Your Trip"
              description="No hassle, no problem"
              icon={Rowing}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
