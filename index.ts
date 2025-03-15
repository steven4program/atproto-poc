import express from 'express';
import { AtpAgent } from '@atproto/api';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const HANDLE = process.env.BSKY_HANDLE || '';
const PASSWORD = process.env.BSKY_PASSWORD || '';

const agent = new AtpAgent({ service: 'https://bsky.social' });

(async () => {
  try {
    await agent.login({
      identifier: 'admin',
      password: 'admin'
    })
  } catch (error) {
    console.error('Error logging in: ', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
