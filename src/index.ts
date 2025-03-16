import express, { Request, Response } from 'express';
import { AtpAgent } from '@atproto/api';
import { config } from 'dotenv';
import { PostRequestBody } from './types';

/**
 * Atproto API Integration Server
 * 
 * This server provides endpoints to interact with the AT Protocol (Bluesky).
 * It allows posting content to a Bluesky account through a simple REST API.
 */

// Load environment variables
config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const HANDLE: string = process.env.BSKY_HANDLE || '';
const PASSWORD: string = process.env.BSKY_PASSWORD || '';

// Initialize AT Protocol agent
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

// Initial login
loginAgent();

/**
 * POST /post - Creates a new post on Bluesky
 * 
 * Request body:
 * - text: The content of the post
 * 
 * Returns the created post data or error information
 */
app.post('/post', async (req: Request, res: Response): Promise<any> => {
  const { text }: PostRequestBody = req.body;

  // Build the record with text content
  const record = { 
    text,
    $type: 'app.bsky.feed.post',
    createdAt: new Date().toISOString(),
  };

  try {
    // Ensure the agent is logged in (agent.session should be available)
    if (!agent.session || !agent.session.did) {
      return res.status(500).json({ error: 'Agent is not logged in.' });
    }

    // Create the post record using the AT Protocol API.
    const result = await agent.com.atproto.repo.createRecord({
      repo: agent.session.did,
      collection: 'app.bsky.feed.post',
      record,
    });

    console.log(`Post created successfully: ${result.data.uri}`);
    res.json(result);
  } catch (error: any) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
