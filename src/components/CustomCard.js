import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function CustomCard({ imagePath, imageHeight, title, value }) {
  // const cardRef = useRef(null);
  // const [cardHeight, setCardHeight] = useState(0);

  // useLayoutEffect(() => {
  //   console.log(cardRef.current.getBoundingClientRect());
  //   setCardHeight(cardRef.current.getBoundingClientRect().height);
  // }, []);

  return (
    <Card
      // ref={cardRef}
      // style={{ width: "fit-content" }}
      elevation={4}
      style={{ height: "80px" }}
    >
      <Grid container alignItems="center" style={{ padding: "1rem 1rem" }}>
        <img
          src={imagePath}
          alt={title}
          height={imageHeight}
          style={{ marginRight: "1rem" }}
        />
        <Grid item>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography>{title}</Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography color="primary">{value}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
