import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Stack from "@mui/material/Stack";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function Content() {
  const [cards, setCards] = React.useState([]);
  const [recording, setRecording] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [transcript, setTranscript] = React.useState("Speak or Type here");
  const [summary, setSummary] = React.useState();
  const [actas, setActas] = React.useState("act as an assistant to take note");
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
      >
        <AppBar position="static">
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
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Record"
            icon={!recording ? <MicIcon /> : <MicOffIcon />}
            onClick={() => {
              setRecording(!recording);
              setCards([]);
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

function LoadingIcon() {
  return (
    <svg width="180" height="400" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 10 80 Q 52.5 10, 95 80 T 180 80"
        stroke="green"
        fill="transparent"
      >
        <animate
          attributeName="d"
          begin="1s"
          dur="3s"
          values="M 10 80 Q 52.5 10, 95 80 T 180 80; M 10 80 Q 52.5 80, 95 80 T 180 80; M 10 80 Q 52.5 10, 95 80 T 180 80;"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          begin="1s"
          dur="10s"
          values="red; orange; yellow; green; blue; indigo; violet; red"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 10 80 Q 52.5 80, 95 10 T 180 80"
        stroke="green"
        fill="transparent"
      >
        <animate
          attributeName="d"
          begin="1s"
          dur="3s"
          values="M 10 80 Q 52.5 80, 95 10 T 180 80; M 10 80 Q 52.5 80, 95 80 T 180 80; M 10 80 Q 52.5 80, 95 10 T 180 80"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          begin="1s"
          dur="10s"
          values="red; orange; yellow; green; blue; indigo; violet; red"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function Backup() {
  return (
    <Stack className="box">
      <Header />
      <div className="row content">
        {!loading && (
          <Recording setRecording={setRecording} recording={recording} />
        )}

        {!loading && transcript && (
          <Transcript
            transcript={transcript}
            setTranscript={setTranscript}
            actas={actas}
            setActas={setActas}
            setSummary={setSummary}
            getSummary={getSummary}
            setLoading={setLoading}
            actasList={actasList}
          />
        )}

        {!loading && summary && <Summary summary={summary} />}
      </div>

      <LoadingPage loading={loading} />
    </Stack>
  );
}

export { Content };
