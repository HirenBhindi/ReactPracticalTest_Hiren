import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../store/user/userSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    minHeight: "90vh",
  },
  card: {
    background: "rgb(175, 216, 255)",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    borderRadius: "27px",
    padding: "20px",
    // margin: "auto",
    // marginTop: "0%",
    marginLeft: "35%",
    marginBottom: "10%",
    width: "30vw",
    height: "50%",
    lineHeight: "7vh",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "#0069d9",
    },
  },
  dialogTitle: {
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
  },
  dialogContent: {
    background: "#f2f2f2",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  dialogText: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#333",
  },
}));

export default function PopUp() {
  const { id = null } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.author.data);
  const author = posts?.user;
  const classes = useStyles();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [dispatch, id]);

  const handlePostClick = () => {
    setSelectedPost(author);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Link to={"/"}>
          <Button
            onClick={() => console.log("button clicked!")}
            variant="contained"
            className={classes.button}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography variant="h4">{posts?.title}</Typography>
            <Typography variant="body1">{posts?.body}</Typography>
            <Button
              onClick={handlePostClick}
              variant="contained"
              className={classes.button}
            >
              {author?.firstName}
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Dialog
        open={Boolean(selectedPost)}
        className={classes.dialogueContainer}
        onClose={handleCloseDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          {author?.firstName}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div style={{ border: "1px solid grey" }}>
            <img src={author?.image} alt="image" />
          </div>
          <Typography variant="h5">First Name:- {author?.firstName}</Typography>
          <Typography variant="h5">Last Name:- {author?.lastName}</Typography>
          <Typography variant="h5">User Name:- {author?.username}</Typography>
          <Typography variant="h5">
            Address:- {author?.address?.address}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
