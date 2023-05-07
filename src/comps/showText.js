import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowText({ content }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Show
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        scroll="paper"
        TransitionComponent={Transition}
      >
        <DialogContent>
          <DialogContentText>
            <pre>{content}</pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              navigator.share({ title: "Happy Share", text: content });
            }}
          >
            Share
          </Button>
          <Button
            onClick={() => {
              console.log({ content });
              navigator.clipboard.writeText(content);
            }}
          >
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
