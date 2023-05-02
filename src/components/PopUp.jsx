import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorData } from "../store/user/userSlice";
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
  Popover,
  Box,
} from "@mui/material";
const PopUp = ({ userId, openPopUp, handleCloseDialog }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const authorData = useSelector((state) => state?.author?.UserData?.data);
  console.log("Author :------------", authorData);
  const author = {};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthorData(userId));
  }, []);
  return (
    <Popover
      open={Boolean(openPopUp)}
      // anchorEl={anchorEl}
      onClose={handleCloseDialog}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Box
        sx={{
          background: "#f2f2f2",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <DialogTitle>{authorData?.firstName}</DialogTitle>
        <DialogContent>
          <div style={{ border: "1px solid grey" }}>
            <img src={authorData?.image} alt="author picture" />
          </div>
          <Typography variant="h5">
            First Name:- {authorData?.firstName}
          </Typography>
          <Typography variant="h5">
            Last Name:- {authorData?.lastName}
          </Typography>
          <Typography variant="h5">
            User Name:- {authorData?.username}
          </Typography>
          <Typography variant="h5">
            Address:- {authorData?.address?.address}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Box>
    </Popover>
  );
};

export default PopUp;
