
// Load any environment settings from .env files before doing anything else.
import dotenv from 'dotenv';
dotenv.config();

// Slack modules
import { WebClient, LogLevel } from '@slack/web-api';
import { App } from '@slack/bolt';

/**
 * Note: I use a local .env file in the project root to define the SLACK_TOKEN. The .env file is on the .gitignore
 * list so it SHOULDN'T be easily committed to git.
 */
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SLACK_SOCKET_TOKEN = process.env.SLACK_SOCKET_TOKEN;

const client = new WebClient(SLACK_TOKEN, {
    logLevel: LogLevel.DEBUG
});
const app = new App({
    token: SLACK_TOKEN,
    appToken: SLACK_SOCKET_TOKEN,
    socketMode: true,
});

// Conversation Identifiers
// - C020PABE8HL = #hive13_bot_farm
// - C020MAN5TS6 = #bot_development
const conversationId = 'C020PABE8HL';

/**
 * Sends a Slack message to the currently configured channel.
 *
 * @param message Message to send.
 */
async function _PostMessage(message: string) {
    const res = await client.chat.postMessage({channel: conversationId, text: message});

    console.log(`Message sent: ${res.ts}`);
}

/**
 * This is run to initialize the Slack socket app
 */
async function _StartApp() {
    await app.start();

    console.log('Bolt app started');
}

// need app_mentions:read and chat:write scopes
app.event('app_mention', async ({ event, context, client, say }) => {
    try {
        await say(`Hello ${event.username}`);
    } catch (error) {
        console.error(error);
    }
});

// Responds specific messages that match the regex.
app.message(':wave:', async({message, say}) => {
   await say(`Hello`);
});

_StartApp()
    .then(() => _PostMessage("Slack bot has started listening."))
    .catch((err) => {
        console.error(`Error: ${err}`);
    });


