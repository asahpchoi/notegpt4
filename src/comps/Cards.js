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
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";
import { uploadToWhisper, getSummary, init, createNotionPage } from "./api.js";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Actions({ items, transcript, addCard, setLoading }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={1} style={{ marginLeft: "auto" }}>
        {items.map((i) => (
          <Chip
            label={i}
            onClick={async () => {
              setLoading(true);
              const summary = await getSummary(transcript, i);

              addCard("summary", summary);
              setLoading(false);
            }}
            style={{ margin: 5 }}
          />
        ))}
      </Stack>
    </Box>
  );
}

function ChatCard({ item, removeCard, actasList, addCard, setLoading }) {
  const [content, setContent] = React.useState(item.content);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="body2"> </Typography>
        <TextareaAutosize
          style={{
            width: "100%",
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
        styles={{ "align-items": "end" }}
        style={{ paddingRight: 20 }}
      >
        <IconButton
          aria-label="Copy"
          onClick={() => {
            alert(item.id);
          }}
        >
          <ContentCopyIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Create">
          <EditNoteIcon />
        </IconButton>
        <IconButton aria-label="Delete">
          <DeleteIcon
            onClick={() => {
              removeCard(item.id);
            }}
          />
        </IconButton>

        {item.type === "transcript" ? (
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
        ) : (
          ""
        )}
      </CardActions>
      {item.type === "transcript" ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Actions
            items={actasList}
            transcript={content}
            addCard={addCard}
            setLoading={setLoading}
          />
        </Collapse>
      ) : (
        ""
      )}
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
