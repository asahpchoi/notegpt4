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
import MicOffIcon from "@mui/icons-material/MicOff";
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
        rows={8}
      />

      <ShowText content={summary} />
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
      id="micicon"
      onClick={() => {
        setRecording(!recording);
      }}
    >
      {!recording ? <MicIcon /> : <MicOffIcon color="secondary" />}
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
        rows={8}
        variant="filled"
        value={transcript}
        className="multiline"
        onChange={(event) => {
          setTranscript(event.target.value);
        }}
      />
      <Box className="input">
        <InputLabel id="actaslabel">Act as</InputLabel>
        <Select
          labelId="actaslabel"
          value={actas}
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

        <Button
          variant="outlined"
          onClick={async () => {
            setLoading(true);
            setSummary(await getSummary(transcript, actas));
            setLoading(false);
          }}
        >
          Run
        </Button>

        <ShowText content={transcript} />
      </Box>
    </>
  );
};

export { Summary, Transcript, LoadingPage, Header, Recording };
