
// Load any environment settings from .env files before doing anything else.
import dotenv from 'dotenv';
dotenv.config();

// Slack modules
import { WebClient } from '@slack/web-api';

/**
 * Note: I use a local .env file in the project root to define the SLACK_TOKEN. The .env file is on the .gitignore
 * list so it SHOULDN'T be easily committed to git.
 */
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SLACK_SOCKET_TOKEN = process.env.SLACK_SOCKET_TOKEN;

const web = new WebClient(SLACK_TOKEN);

// Conversation Identifiers
// - C020PABE8HL = #hive13_bot_far
// - C020MAN5TS6 = #bot_development
const conversationId = 'C020PABE8HL';

/**
 * Sends a Slack message to the currently configured channel.
 *
 * @param message Message to send.
 */
async function _PostMessage(message: string) {
    const res = await web.chat.postMessage({channel: conversationId, text: message});

    console.log(`Message sent: ${res.ts}`);
}

_PostMessage("Testing out slack client.")
    .catch((err) => {
        console.error(`Error: ${err}`);
    })
