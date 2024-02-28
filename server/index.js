const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const CLIENT_ID = '63980681843-745i07d5l7sj6n63rc8gt5c6qv5ittmm.apps.googleusercontent.com';
const CLIENT_SECRET = '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T';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.post('/auth/google/callback', async (req, res) => {
  const { code } = req.body;
  try {
    const { tokens } = await client.getToken(code);
    res.json({ tokens }); // Send tokens back to the client
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.status(500).send('Authentication failed');
  }
});

app.get('/list-emails', async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5,
    });

    const emails = await Promise.all(
      response.data.messages.map(async (message) => {
        const emailData = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full', // 'full', 'metadata', or 'minimal'
        });

        // Extract and format email data here...
        const headers = emailData.data.payload.headers;
        const subjectHeader = headers.find(header => header.name === "Subject");
        const fromHeader = headers.find(header => header.name === "From");
        const snippet = emailData.data.snippet;

        return {
          id: message.id,
          subject: subjectHeader ? subjectHeader.value : "No Subject",
          from: fromHeader ? fromHeader.value : "Unknown Sender",
          snippet: snippet,
        };
      })
    );

    res.json({ emails });
  } catch (error) {
    console.error('Failed to fetch emails:', error);
    res.status(500).send('Failed to fetch emails');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
