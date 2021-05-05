
// Load any environment settings from .env files before doing anything else.
import dotenv from 'dotenv';
dotenv.config();

// Slack modules
import { WebClient } from '@slack/web-api';

const SLACK_TOKEN = process.env.SLACK_TOKEN;

const web = new WebClient(SLACK_TOKEN);

const conversationId = 'CMEGP18F5';

async function _PostMessage(message: string) {
    const res = await web.chat.postMessage({channel: conversationId, text: message});

    console.log(`Message sent: ${res.ts}`);
}

_PostMessage("Testing out slack client.")
    .catch((err) => {
        console.error(`Error: ${err}`);
    })
