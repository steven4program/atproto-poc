# AT Protocol POC API

A simple Express server that provides an API to interact with the AT Protocol (Bluesky). This application allows you to programmatically create posts on Bluesky through a REST API endpoint.

## Features

- Authentication with Bluesky using your account credentials
- Create text posts via a simple HTTP POST request

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- A Bluesky account

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atproto-poc
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Bluesky credentials:
```
PORT=3000
BSKY_HANDLE=your-handle.bsky.social
BSKY_PASSWORD=your_password
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Create a Post

**Endpoint:** `POST /post`

**Request Body:**
```json
{
  "text": "Hello, Bluesky world!"
}
```

**Response:**
```json
{
  "uri": "at://did:plc:xxxx/app.bsky.feed.post/yyyy",
  "cid": "bafyreiabc123..."
}
```

## Usage Example

Using curl:

```bash
curl -X POST \
  http://localhost:3000/post \
  -H "Content-Type: application/json" \
  -d '{"text":"Testing my AT Protocol API!"}'
```

Using JavaScript fetch:

```javascript
fetch('http://localhost:3000/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Hello from my API!',
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Security Considerations

- This app uses your Bluesky credentials directly in the environment variables. For production use, consider implementing a more secure authentication method.
- The API currently has no auth protection - add authentication if exposing this API beyond local development.

## License

ISC
