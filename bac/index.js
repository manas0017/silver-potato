require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { searchDocs } = require("./firebase");
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { admin, db } = require('./firebase');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const projectId = 'ahhhhh-lpbn'; // Updated with your actual Dialogflow project ID
const sessionClient = new dialogflow.SessionsClient({
  credentials: JSON.parse(process.env.SERVICE_ACCOUNT)
});

// Enhanced error logging for Dialogflow API calls
app.post('/chat', async (req, res) => {
  const { message, userId = 'anonymous' } = req.body;
  const sessionId = uuid.v4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const reply = result.fulfillmentText || 'Sorry, I didn’t understand that.';

    // Save chat log to Firestore
    await admin.firestore().collection('chat_logs').add({
      userId,
      message,
      botReply: reply,
      timestamp: new Date()
    });

    res.json({ reply });
  } catch (err) {
    console.error('Dialogflow error:', err);
    res.status(500).json({
      error: 'Error communicating with Dialogflow',
      details: err.message,
      code: err.code,
      metadata: err.metadata
    });
  }
});

app.post("/search", async (req, res) => {
    const question = req.body.question;
    if (!question) {
        return res.status(400).json({ error: "question is required!" });
    }

    try {
        const result = await searchDocs(question);
        res.json(result); // Send the object directly, no extra "answer" wrapper
    } catch (error) {
        console.error('Error in /search endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
