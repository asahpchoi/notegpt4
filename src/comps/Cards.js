import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { TextareaAutosize } from "@mui/base";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";
import { uploadToWhisper, getSummary, init, createNotionPage } from "./api.js";
import Snackbar from "@mui/material/Snackbar";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import "animate.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ChatCard({ item, removeCard, actasList, addCard, setLoading }) {
  const [content, setContent] = React.useState(item.content);
  const [expanded, setExpanded] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [link, setLink] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ minWidth: 275, margin: 2 }}
      className="animate__animated animate__backInLeft"
    >
      <CardContent>
        <Typography variant="body2"> </Typography>
        <TextareaAutosize
          style={{
            width: "100%",
            border: 0,
          }}
          minRows={3}
          placeholder="Empty"
          defaultValue={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
      </CardContent>

      <CardActions
        style={{
          backgroundColor: "#fdffcd",
        }}
      >
        <IconButton aria-label="Copy" style={{ marginLeft: "auto" }}>
          <ContentCopyIcon
            onClick={() => {
              setMessage("message copied!");
              setNotification(true);
              navigator.clipboard.writeText(content);
            }}
          />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon
            onClick={() => {
              navigator.share({ title: "Happy Share", text: content });
            }}
          />
        </IconButton>
        <IconButton aria-label="Create">
          <EditNoteIcon
            onClick={async () => {
              const url = await createNotionPage(content);
              setMessage(`note created! ${url}`);
              setLink(url);
              setNotification(true);
            }}
          />
        </IconButton>
        <IconButton aria-label="Delete">
          <DeleteIcon
            onClick={() => {
              removeCard(item.id);
            }}
          />
        </IconButton>

        {link && (
          <Link
            href={link}
            variant="body2"
            target="_blank"
            style={{ marginLeft: "auto" }}
          >
            Open Note
          </Link>
        )}

        <Badge
          badgeContent={actasList.length}
          color="primary"
          style={{ marginLeft: "auto" }}
        >
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Badge>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Actions
          items={actasList}
          transcript={content}
          addCard={addCard}
          setLoading={setLoading}
        />
      </Collapse>

      <Snackbar
        open={notification}
        autoHideDuration={3000}
        onClose={() => {
          setNotification(false);
        }}
        message={message}
      ></Snackbar>
    </Card>
  );
}

export function Cards({ cards, removeCard, addCard, setLoading }) {
  const [actasList, setActasList] = React.useState([]);

  React.useEffect(() => {
    init(setActasList);
  }, []);

  return cards.map((c, i) => (
    <ChatCard
      key={i}
      item={c}
      removeCard={removeCard}
      actasList={actasList}
      addCard={addCard}
      setLoading={setLoading}
    />
  ));
}

function Actions({ items, transcript, addCard, setLoading }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        spacing={1}
        style={{ marginLeft: "auto", backgroundColor: "#eeffee" }}
      >
        {items.map((i, k) => {
          return (
            <Button
              variant="outlined"
              onClick={async () => {
                setLoading(true);
                const summary = await getSummary(transcript, i);

                addCard("summary", summary);
                setLoading(false);
              }}
              style={{ margin: 5 }}
            >
              {i}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
