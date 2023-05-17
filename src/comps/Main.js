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
        style={{ height: "100vh" }}
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
              News
            </Typography>
            <Button color="inherit">Login</Button>
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
          <ReactMic
            record={recording}
            onStop={onStop}
            onData={onData}
            mimeType="audio/mp3"
          />
        </BottomNavigation>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box sx={{ width: "80vw" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </Backdrop>
    </>
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
