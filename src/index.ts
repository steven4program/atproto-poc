import express from 'express';
import { AtpAgent } from '@atproto/api';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const HANDLE: string = process.env.BSKY_HANDLE || '';
const PASSWORD: string = process.env.BSKY_PASSWORD || '';

const agent = new AtpAgent({ service: 'https://bsky.social' });

async function loginAgent(): Promise<void> {
  try {
    await agent.login({
      identifier: HANDLE,
      password: PASSWORD,
    });
    console.log('Logged in successfully');
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

loginAgent();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
