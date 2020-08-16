import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Accordian from "components/Accordian/Accordian.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const [dataForFaqs, setDataForFaqs] = React.useState([
    {
      title: "How much does your service charge?",
      description:
        "It depends upon the type of service you need and the distance covered you can always check the cost on the app",
    },
    {
      title: "How to register for service?",
      description:
        "Please watch these videos and contact our customer support for proper guidance.",
    },
    {
      title: "How to earn from FLOATSTA?",
      description:
        "You can register your boat or marine related service with us and start selling your time and assets in order to earn money. For more information call us at 000-000-00-0",
    },
  ]);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div
      className={classes.sectionFaq}
      style={{
        // height: '500px',
        minHeight: '500px',
        backgroundSize: "cover",
        overflow: "hidden",
        backgroundImage: `url(https://images.unsplash.com/photo-1493787039806-2edcbe808750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)`,
      }}
    >
      <h3 className={classes.title}>Frequently Asked Questions</h3>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} style={{ margin: "auto" }}>
            <Card plain>
              <Accordian data={dataForFaqs} />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
