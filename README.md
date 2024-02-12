# Fullstack Message-Board Prototype

This project is a prototype of a full-stack message board application. It consists of multiple named channels, where users can select a channel, view messages in the selected channel, and submit new messages to the selected channel. The application is implemented with a React single-page web application as the frontend and a NodeJS backend.

## Features

- Full page application with three panels.
    - Navigation panel: Shows a list of channels.
    - Message list panel: Shows a list of message bodies for one channel.
    - Editor panel: Shows a text area input.
- Interactions: 
    - Channel selection: Clicking a channel in navigation panel selects that channel.
    - Message submission: Entering text in editor and clicking submit adds message to the selected channel.
    - Input clearing: Submitting editor clears input.
- State:
    - Channel list is loaded once on loading the application.
    - Messages are loaded from remote on channel selection and updated to screen.
    - Messages are also stored to local state after loading them from remote.
- Backend:
    - Channel and message storage can be an in-memory database.
    - GET and POST endpoints for querying channels and submitting new messages to a channel.

## Setup

1. Clone the repository.
2. Install dependencies for the client by navigating to the client directory (`cd client`) and running `npm install`.
3. Start the React server with `npm run dev`.
4. Install dependencies for the server by navigating to the root directory and running `npm install`.
5. Start the server with `npm start`.

