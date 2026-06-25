const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(express.json());
app.use(cors());

// 🔑 Replace with your Twilio details
const accountSid = "YOUR_ACCOUNT_SID";
const authToken = "YOUR_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

app.post("/send-sms", async (req, res) => {
  try {
    const message = await client.messages.create({
      body: "🚨 SOS ALERT! User needs immediate help!",
      from: "YOUR_TWILIO_NUMBER",
      to: "YOUR_PHONE_NUMBER",
    });

    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
});

app.listen(3000, () => {
  console.log("SMS server running on port 3000");
});