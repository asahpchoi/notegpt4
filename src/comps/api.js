import axios from "axios";

const domain = "https://4q8slb-3000.csb.app";

async function createNotionPage(msg) {
  const data = await axios.post(`${domain}/createPage`, {
    content: msg,
  });
  console.log({ data });

  return data.data.url;
}

async function uploadToWhisper(blob) {
  const url = `${domain}/upload`;

  const data = new FormData();

  const file = new File([blob.blob], "speech.mp3", { type: "audio/mp3" });

  data.append("file", file);

  const resp = await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data.result;
}

async function getSummary(transcript, actas) {
  const result = await axios.post(
    `${domain}/getSummary`,
    {
      transcript,
      actas,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.data.summary.content;
}

const init = async (setActasList) => {
  const msglist = await axios.get(`${domain}/getMessageList`);
  setActasList(msglist.data);
};
export { uploadToWhisper, getSummary, init, createNotionPage };
