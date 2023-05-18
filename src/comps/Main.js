import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Stack from "@mui/material/Stack";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import Paper from "@mui/material/Paper";
import { v1 as uuidv1 } from "uuid";
import { Cards } from "./Cards";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { uploadToWhisper, getSummary, init } from "./api.js";
import { ReactMic } from "react-mic";
import Backdrop from "@mui/material/Backdrop";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import { LoadingIcon } from "./Loading";

function Content() {
  const [cards, setCards] = React.useState([]);
  const [recording, setRecording] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [actasList, setActasList] = React.useState([]);

  React.useEffect(() => {
    init(setActasList);
  }, []);

  const onStop = async (blob) => {
    setLoading(true);
    const data = await uploadToWhisper(blob);
    addCard("transcript", data);
    setLoading(false);
  };

  const onData = (blob) => {};

  function removeCard(id) {
    const newCards = [...cards].filter((c) => c.id !== id);
    setCards(newCards);
  }
  function addCard(type, content) {
    let newCards = [...cards];

    newCards.push({
      id: uuidv1(),
      type: type,
      content: content,
    });
    setCards(newCards);
  }
  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="main"
        style={{
          backgroundColor: "#e0ffcd",
        }}
      >
        <AppBar
          position="static"
          style={{ backgroundColor: "#e0ffcd", color: "#333333" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Capture Note
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={2}
          style={{
            height: "100%",
            backgroundColor: "#EEEEEE",
            overflowY: "auto",
            width: "100vw",
            alignContent: "start",
            margin: 0,
          }}
        >
          <Cards
            cards={cards}
            removeCard={removeCard}
            addCard={addCard}
            setLoading={setLoading}
          />
        </Paper>
        <BottomNavigation
          showLabels
          style={{
            backgroundColor: "#e0ffcd",
            width: "100%",
            margin: 0,
          }}
        >
          <BottomNavigationAction
            label="Record"
            icon={!recording ? <MicIcon /> : <MicOffIcon />}
            onClick={() => {
              setRecording(!recording);
              setCards([]);
            }}
          />
          <BottomNavigationAction
            label="Add"
            icon={<AddBoxIcon />}
            onClick={() => {
              addCard([{ type: "transcript" }]);
            }}
          />
          <div style={{ display: "none" }}>
            <ReactMic
              record={recording}
              onStop={onStop}
              onData={onData}
              mimeType="audio/mp3"
            />
          </div>
        </BottomNavigation>
      </Stack>
      <Box sx={{ width: "80vw" }}></Box>
      <Backdrop
        sx={{ color: "#ccc", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {" "}
        <LoadingIcon />
      </Backdrop>
    </>
  );
}

export { Content };
