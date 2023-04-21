import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../store/user/userSlice";
import { Link, useParams } from "react-router-dom";
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
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";

// const CardContainer = styled(Card)({
//   background: "rgb(175, 216, 255)",
//   boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
//   borderRadius: "27px",
//   padding: "20px",
//   marginLeft: "35%",
//   marginBottom: "10%",
//   width: "30vw",
//   height: "50%",
//   lineHeight: "7vh",
// });

// const CardTitle = styled(Typography)({
//   variant: "h4",
// });

// const CardBody = styled(Typography)({
//   variant: "body1",
// });

// const CardButton = styled(Button)({
//   background: "#007bff",
//   color: "#fff",
//   fontWeight: "bold",
//   "&:hover": {
//     background: "#0069d9",
//   },
// });

// const DialogTitleContainer = styled(DialogTitle)({
//   background: "#007bff",
//   color: "#fff",
//   fontWeight: "bold",
// });

// const DialogContentContainer = styled(DialogContent)({
//   background: "#f2f2f2",
//   padding: "20px",
//   borderRadius: "10px",
//   boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
// });

// const DialogText = styled(Typography)({
//   fontSize: "18px",
//   marginBottom: "15px",
//   color: "#333",
// });

export default function PopUp() {
  const { id = null } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.author.data);
  const author = posts?.user;
  // const classes = useStyles();

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
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f7f7",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        minHeight: "90vh",
      }}
    >
      <Grid item xs={12}>
        <Link to={"/"}>
          <Button
            onClick={() => console.log("button clicked!")}
            variant="contained"
            sx={{
              background: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                background: "#0069d9",
              },
            }}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Card
          variant="outlined"
          sx={{
            background: "rgb(175, 216, 255)",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
            borderRadius: "27px",
            padding: "20px",
            marginLeft: "35%",
            marginBottom: "10%",
            width: "30vw",
            height: "50%",
            lineHeight: "7vh",
          }}
        >
          <CardContent>
            <Typography variant="h4">{posts?.title}</Typography>
            <Typography variant="body1">{posts?.body}</Typography>
            <Button
              onClick={handlePostClick}
              variant="contained"
              sx={{
                background: "#007bff",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  background: "#0069d9",
                },
              }}
            >
              {author?.firstName}
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Dialog
        open={Boolean(selectedPost)}
        onClose={handleCloseDialog}
        sx={{ background: "#f2f2f2", padding: "20px", borderRadius: "10px" }}
      >
        <DialogTitle>{author?.firstName}</DialogTitle>
        <DialogContent>
          <div style={{ border: "1px solid grey" }}>
            <img src={author?.image} alt="author picture" />
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
