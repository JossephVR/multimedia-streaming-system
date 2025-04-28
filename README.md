# Distributed Multimedia System for Content Streaming v1.0

## Description
The goal of this project is to develop a distributed multimedia system capable of streaming music and videos on a computer. The system leverages Edge Computing solutions within a local network environment, enabling efficient management of simultaneous requests and ensuring fast, reliable delivery of multimedia content.

The system provides an adaptive, optimized user interface built with HTML, JavaScript, and CSS technologies. It also utilizes AWS S3 for cloud storage and WebSockets for real-time communication between the server and clients.

### Details
#### API for Videos and Audios
To retrieve the list of available videos and audios, it uses:
```bash
GET /api/videos
```
The system retrieves the links of files stored in S3 and compiles them into a list, which is then sent to the client in JSON format.

AWS S3 is used as the cloud storage API for creating buckets to store multimedia files (mp3 and mp4). These files are retrieved via links and shared between server and client through JSON structures.

#### WebSockets
The system also supports WebSockets for real-time updates of multimedia links.
When a client connects, it receives the current list of multimedia files.
If the client sends the message fetch_videos, the updated list of videos and audios is sent back.


## Project Setup

### Requirements

- Node.js (v14+ recommended)

- npm (comes with Node.js)

### Install Dependencies

Navigate to the websocket folder:

```bash
cd websocket
npm install
```

This will install:

- express

- ws

- @aws-sdk/client-s3

- dotenv

## Environment Variables
Create a .env file inside the websocket folder with the following:
```bash
AWS_ACCESS_KEY_ID=(access-key)
AWS_SECRET_ACCESS_KEY=(secret-key)
AWS_REGION=(aws-region)
BUCKET_NAME=(bucket-name)
```

Replace the values with actual AWS credentials.

### Running the Server
Inside the websocket folder:

```bash
node server.js
```

Port 8080 must be available.

### Running the Client

Simply open the HTML files in the client folder directly in browser (WebSocket server must be running).

## Contributions and Credits
### Authors:

- Josseph Valverde Robles
- Ovidio Martínez Taleno
- Gerson Vargas Gamboa

### This project utilizes the following technologies and resources:

- [AWS S3] – Cloud Storage

- [WebSocket] – Real-time Communication

- [Node.js] – JavaScript Runtime Environment for the Server

- [Worker Threads] – Thread Management for Distributed Processing


