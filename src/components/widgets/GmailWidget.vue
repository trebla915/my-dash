<template>
  <div class="gmail-widget">
    <div class="widget-header">
      <h2>Gmail Inbox</h2>
      <!-- Show sign-in button if not authorized -->
      <button v-if="!isAuthorized" @click="handleAuthClick" class="sign-in-btn">Sign In</button>
      <!-- Show remove button if authorized -->
      <button v-else @click="removeWidget" class="remove-btn">&#8722;</button>
    </div>
    <ul v-if="isAuthorized">
      <li v-for="email in emails" :key="email.id" @click="toggleEmailDetails(email.id)" class="email-item">
        <div class="email-summary">
          <div><strong>From:</strong> {{ email.from }}</div>
          <div><strong>Subject:</strong> {{ email.subject }}</div>
        </div>
        <div v-if="email.expanded" class="email-details">
          <p>{{ email.snippet }}</p>
          <button @click.stop="replyToEmail(email)">Reply</button>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
/* global google */
export default {
  name: 'GmailWidget',
  props: ['widgetId'],
  data() {
    return {
      isAuthorized: false,
      emails: [],
      clientId: '63980681843-745i07d5l7sj6n63rc8gt5c6qv5ittmm.apps.googleusercontent.com',
      apiKey: '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',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
      accessToken: '', // Store the access token
    };
  },
  mounted() {
    this.initGisClient();
  },
  methods: {
    initGisClient() {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.initializeGoogleClient();
      };
      document.head.appendChild(script);
    },
    initializeGoogleClient() {
      google.accounts.oauth2.initCodeClient({
        client_id: this.clientId,
        scope: this.scope,
        ux_mode: 'popup',
        callback: (response) => {
          this.exchangeAuthorizationCode(response.code);
        },
      });
    },
    exchangeAuthorizationCode(code) {
      fetch('http://localhost:3000/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        this.isAuthorized = true;
        this.accessToken = data.tokens.access_token; // Store the access token
        this.listEmails(); // Fetch emails after authentication
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    handleAuthClick() {
      google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: this.scope,
        callback: (response) => {
          if (response.access_token) {
            this.accessToken = response.access_token;
            this.isAuthorized = true;
            this.listEmails();
          }
        },
      }).requestAccessToken();
    },
    async listEmails() {
      try {
        const response = await fetch('http://localhost:3000/list-emails', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch emails');
        const data = await response.json();
        this.emails = data.emails; // Assuming the response has an 'emails' array
      } catch (error) {
        console.error('Error listing emails:', error.message);
      }
    },
    toggleEmailDetails(emailId) {
      const email = this.emails.find(email => email.id === emailId);
      if (email) {
        email.expanded = !email.expanded;
      }
    },
    replyToEmail(email) {
      console.log('Implement reply logic for email here', email);
    },
    removeWidget() {
      this.$emit('remove-widget', this.widgetId);
    },
  },
};
</script>



<style scoped>
.gmail-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
}

.widget-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

/* Updated styling for the sign-in button */
.sign-in-btn {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: auto; /* Center the button when alone */
}

/* Ensure the email content is readable */
.email-summary, .email-details, .email-details p {
  color: #333; /* Darker font for readability */
  text-align: left;
  width: 100%;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 24px;
}

.email-item {
  list-style: none;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  background-color: white; /* Ensure background contrasts with text */
}

button {
  cursor: pointer;
  background-color: #5cb85c;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}

button:hover {
  background-color: #4cae4c;
}
</style>
