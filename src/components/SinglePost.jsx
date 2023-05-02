import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../store/user/userSlice";
import { Link, useParams } from "react-router-dom";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";
// import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import PopUp from "./PopUp";

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

export default function SinglePost() {
  const { id = null } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.author.data);
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [dispatch, id]);

  const handlePostClick = () => {
    setOpenPopUp(true);
  };

  const handleCloseDialog = () => {
    setOpenPopUp(false);
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
              Show Auther Details
            </Button>
          </CardContent>
        </Card>
      </Grid>
      {openPopUp ? (
        <PopUp
          userId={posts?.userId}
          openPopUp={openPopUp}
          handleCloseDialog={handleCloseDialog}
        />
      ) : (
        ""
      )}
    </Grid>
  );
}
