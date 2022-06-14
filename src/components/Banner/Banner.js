import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import banner from '../../assets/crypt_bg.jpg'
import Carousel from './Carousel';


const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${banner})`
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around"
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: "40%",
  },
  bannerTitle: {
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "Montserrat",
  },
  bannerDescr: {
    fontFamily: "Montserrat",
    textTransform: "capitalize",
    color: "darkgrey"
  }
}))

const Banner = () => {
  const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography 
          variant="h2" 
          className={classes.bannerTitle}
          >
            Crypto Tracker
          </Typography>
          <Typography 
          variant="subtitle2"
          className={classes.bannerDescr}>
            Get all the info regarding your favorite crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
};

export default Banner;
