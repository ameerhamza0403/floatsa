import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h6 className={classes.title}>Want to Register your Boat? </h6>

      <p className={classes.description}>
        Floatsta is creating new jobs for small boat owners by providing them a
        medium to communicate with new clients.
      </p>

      {/* <Button
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
        color="primary"
        size="lg"
        onClick={() => {
          history.push("./register-vessel");
        }}
      >
        {" "}
        Register Now
      </Button> */}

      <Link to={"./register-vessel"}>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            color: "white",
            textAlign: "center",
            justifyContent: "center",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 200,
              padding: 10,
              margin: "auto",
              backgroundColor: "purple",

              borderRadius: 5,
            }}
          >
            Register Now
          </span>
        </div>
      </Link>

      <h2 className={classes.title}>
        Floatsta is one of the world’s largest boat sharing companies
      </h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} style={{ margin: "auto" }}>
            <Card plain>
              <GridItem xs={12} sm={12} md={8} className={classes.itemGrid}>
                <img
                  src={
                    "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a9e6edf736ff6cc9c608798992a546b7-1556014535769/234a2232-3ec1-468a-86df-50d3f7ef63a0.png"
                  }
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Alf Delli Fiori
                <br />
                <small className={classes.smallTitle}>CEO </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Floatsta is one of the world’s largest boat sharing companies,
                  operating in Australia, New Zealand. In Australia, Floatsta is
                  available to Skippers in Sydney, Melbourne, Brisbane, the Gold
                  Coast, Adelaide, Canberra and Perth. Floatsta also operates in
                  New Zealand’s major centres, Auckland, Wellington and
                  Christchurch.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Christian Louboutin
                <br />
                <small className={classes.smallTitle}>Designer</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Kendall Jenner
                <br />
                <small className={classes.smallTitle}>Model</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem> */}
        </GridContainer>
      </div>
    </div>
  );
}
