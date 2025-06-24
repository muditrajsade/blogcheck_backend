require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const { OpenAI } = require("openai");
const app = express();
app.use(cors());
app.use(express.json());
const axios = require('axios');
const path = require("path");

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;  // Replace with your real key

function extractSubdomain(blogUrl) {
  try {
    console.log(blogUrl);
    const subdomain = blogUrl.split(".blogspot.com")[0];
    console.log(subdomain);
    return subdomain;
  } catch {
    return null;
  }
}

app.get('/',function(req,res){

  res.sendFile(path.join(__dirname,'index.html'));

})

app.post('/rules', async (req, res) => {

  let rgh = req.body.blogUrl;
  console.log(rgh);

  let abdf = extractSubdomain(rgh);
  

  try{

    const snapshot = await db.collection("blogRules").get();

    console.log(snapshot);

     const rules = [];
    snapshot.forEach(doc => {
      rules.push({ id: doc.id, ...doc.data() });
    });
    let indica=0;
    console.log(rules);
    let rls = "";
    for(let rfg = 0;rfg<rules.length;rfg++){
      if(rules[rfg].id === abdf ){
        indica = 1;
        rls = rules[rfg].rules;
        break;
      }
    }

    if(indica == 0){
      const newBlogRule = {
  rules: ""
};

db.collection("blogRules")
  .doc(abdf)  // <-- this sets the custom document ID
  .set(newBlogRule)
  .then(() => {
    console.log("Document written with custom ID:", abdf);
    res.json({ exists: 0, rules: "" });
  })
  .catch((error) => {
    console.error("Error adding document:", error);
    res.status(500).json({ error: "Failed to create document" });
  });


      
    }
    else{

      res.json({exists:1,rules:rls});



    }

    

  }
  catch(error){

    console.log(error);

  }
  
});

app.post('/rules_save',async (req,res)=>{

  try{

    console.log(req.body.blogUrl);
    


    

let rfg = req.body.blogUrl.split(".blogspot.com")[0];

 // Output: "abgdh"


    console.log(rfg);
    let rls = req.body.rules;

    const geminiResponse = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [
          {
            text: `Extract and list individual rules clearly from this text. Only return the rules as a numbered list:\n${rls}`
          }
        ]
      }
    ]
  },
  {
    headers: {
      'Content-Type': 'application/json',
    }
  }
);

const geminiText = geminiResponse.data.candidates[0].content.parts[0].text;


  

    db.collection("blogRules")
  .doc(rfg)  // this is your document ID (like "yourblog")
  .update({ rules: geminiText })
  .then(() => {
    console.log("Rules updated successfully");
    res.json({ ok : 1,status: "updated", rules: rls });
  })
  .catch((error) => {
    console.error("Error updating rules:", error);
    res.status(500).json({ ok: 0, error: "Failed to update rules" });
  });



  }
  catch(error){

    console.log(error);

  }

});


app.post('/moderate', async (req, res) => {
  const { blogUrl, title, content } = req.body;
  
  const subdomain = extractSubdomain(blogUrl);
  try {
    
    const doc = await db.collection("blogRules").doc(subdomain).get();
    const rules = doc.exists ? doc.data().rules : "";
    
    const moderationResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Here are the rules:\n${rules}\n\nDoes the following blog post follow these rules? Reply only YES or NO.\n\nTitle: ${title}\nContent: ${content}`,
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply = moderationResponse.data.candidates[0].content.parts[0].text.trim().toUpperCase();
    if(reply == "YES"){


      res.json({ allowed:1 });

    }
    else{

      res.json({allowed:0});

    }

    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Moderation failed" });
  }
});


const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
