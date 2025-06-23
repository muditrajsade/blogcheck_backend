const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require("./serviceaccounts.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

function extractSubdomain(blogUrl) {
  try {
    const url = new URL(blogUrl);
    return url.hostname.split(".")[0];
  } catch {
    return null;
  }
}

app.post('/rules', async (req, res) => {
  
});


const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
