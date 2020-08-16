import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import FAQs from "./Sections/FAQs.js";
import images from "../../links/links";
// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import MapSection from "./Sections/MapSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  useEffect(() => {
    console.log(parseInt(Math.random() * (6 - 0) + 0));
  }, []);

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        // color="transparent"
        color="white"
        routes={dashboardRoutes}
        brand="FLOATSTA"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={images[parseInt(Math.random() * (6 - 0) + 0)]}>
      {/* <Parallax filter image={images[0]}> */}
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Your Boat Trip Starts With FLOATSTA.
              </h1>
              <h4>
                Book any boat or ship in just few clicks and enjoy your next
                boat trip comfortably without any hassle.
              </h4>
              <br />
              {/* <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button> */}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <MapSection />
        <div className={classes.container}>
          <ProductSection />
          <FAQs />
          <TeamSection />
          {/* <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
