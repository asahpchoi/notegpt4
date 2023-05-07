import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { ButtonGroup } from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import Skeleton from "@mui/material/Skeleton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import MicIcon from "@mui/icons-material/Mic";
import Fab from "@mui/material/Fab";
import ShowText from "./showText.js";

const LoadingPage = ({ loading }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </Backdrop>
  );
};

const Summary = ({ summary }) => {
  return (
    <>
      <TextField
        id="filled-multiline-flexible"
        label="Summary"
        multiline
        variant="filled"
        value={summary}
        className="multiline"
        rows={4}
      />
      <Button
        variant="outlined"
        onClick={() => {
          navigator.share({ title: "Happy Share", text: summary });
        }}
      >
        <ShareIcon />
        Share
      </Button>
      <ShowText />
    </>
  );
};
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters></Toolbar>
    </AppBar>
  );
};

const Recording = ({ setRecording, recording }) => {
  return (
    <Fab
      color="primary"
      onClick={() => {
        setRecording(!recording);
      }}
    >
      <MicIcon />
    </Fab>
  );
};

const Transcript = ({
  transcript,
  setTranscript,
  actas,
  setActas,
  setSummary,
  getSummary,
  setLoading,
  actasList,
}) => {
  return (
    <>
      <TextField
        label="Transcript or URL"
        multiline
        rows={4}
        variant="filled"
        value={transcript}
        className="multiline"
        onChange={(event) => {
          setTranscript(event.target.value);
        }}
      />
      <Box className="input">
        <FormControl fullWidth>
          <InputLabel id="actaslabel">Act as</InputLabel>
          <Select
            labelId="actaslabel"
            value={actas}
            label="Act as"
            onChange={(event) => {
              setActas(event.target.value);
            }}
            defaultValue=""
          >
            {actasList.map((l, i) => {
              return (
                <MenuItem key={i} value={l}>
                  {l}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <ButtonGroup>
        <Button
          variant="outlined"
          onClick={async () => {
            setLoading(true);
            setSummary(await getSummary(transcript, actas));
            setLoading(false);
          }}
        >
          <SummarizeIcon />
          Get Summary
        </Button>
      </ButtonGroup>
      <ShowText content={transcript} />
    </>
  );
};

export { Summary, Transcript, LoadingPage, Header, Recording };
