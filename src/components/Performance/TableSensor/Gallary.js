import React, { useState, useEffect } from "react";
import "./TableSensor.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Divider, Grid } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const getCustomDate = (timestampStr) => {
  const date = new Date(Number(timestampStr));
  const string =
    date.getDate() +
    "/" +
    date.getMonth() +
    1 +
    ", " +
    date.getHours() +
    ":" +
    date.getMinutes();
  return string;
};

export default function SingleLineImageList({
  itemData = [],
  serverUrl,
  handleImageClick,
}) {
  const classes = useStyles();

  const scrollValue = 200;

  const onPrev = () => {
    document.getElementById("imagesContainer").scrollLeft -= scrollValue;
  };

  const onNext = () => {
    document.getElementById("imagesContainer").scrollLeft += scrollValue;
  };

  return (
    // <div className={classes.root}>
    //   <ImageList className={classes.imageList} cols={2.5}>
    //     {itemData.map((item, index) => (
    //       <ImageListItem
    //         key={item.timestamp}
    //         style={{
    //           marginLeft: index > 0 && item.title === "Morning" ? "1rem" : 0,
    //         }}
    //       >
    //         <img src={serverUrl + item.imgUrl} alt={item.title} width={200} />
    //         <ImageListItemBar
    //           title={
    //             <span>
    //               {item.title}&emsp;
    //               {new Date(Number(item.timestamp)).toLocaleString()}
    //             </span>
    //           }
    //           subtitle={
    //             <span>
    //               Parmeters: {item.parameter}&ensp;LDR 1: {item.ldr1}&ensp;LDR
    //               2: {item.ldr2}&ensp;LDR 3: {item.ldr3}&ensp;LDR 4: {item.ldr4}
    //             </span>
    //           }
    //         />
    //       </ImageListItem>
    //     ))}
    //   </ImageList>
    // </div>
    <div>
      <div
        style={{
          width: "1200px",
          display: itemData.length > 0 ? "flex" : "none",
          justifyContent: "space-between",
          paddingRight: "1rem",
        }}
      >
        <KeyboardArrowLeftIcon
          color="primary"
          style={{ cursor: "pointer" }}
          size="small"
          onClick={onPrev}
        />
        <KeyboardArrowRightIcon
          color="primary"
          style={{ cursor: "pointer" }}
          size="small"
          onClick={onNext}
        />
      </div>
      <div
        style={{
          width: "1200px",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          display: itemData.length > 0 ? "block" : "none",
          marginTop: ".5rem",
        }}
        id="imagesContainer"
      >
        {itemData.map((item, index) => (
          <div
            style={{
              display: "inline-block",
              marginLeft: index > 0 && item.title === "Morning" ? "1rem" : "0",
              marginRight: item.title === "Morning" ? ".25rem" : "",
            }}
          >
            <small style={{ fontSize: ".8rem" }}>
              Paremeter: {item.parameter}
            </small>
            <br />
            <small style={{ fontSize: ".8rem" }}>
              LDR 1: {item.ldr1}&ensp;LDR 2: {item.ldr2}
            </small>
            <br />
            <small style={{ fontSize: ".8rem" }}>
              LDR 3: {item.ldr3}&ensp;LDR 4: {item.ldr4}
            </small>
            <br />
            <div className="image-container">
              <div className="bottom-centered">
                <small style={{ fontSize: ".8rem" }}>{item.title}</small>
                <small style={{ fontSize: ".8rem", marginLeft: "1rem" }}>
                  {getCustomDate(item.timestamp)}
                </small>
              </div>
              <img
                src={serverUrl + item.imgUrl}
                alt={item.title}
                width={190}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleImageClick(
                    serverUrl + item.imgUrl,
                    item.title + " " + getCustomDate(item.timestamp)
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
