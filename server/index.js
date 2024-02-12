const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

let messageId = 1;
const channels = [
    {
      title: "Social",
      label: "972",
      variant: "ghost",
      messages: []
    },
    {
      title: "Updates",
      label: "342",
      variant: "ghost",
      messages: []
    },
    {
      title: "Forums",
      label: "128",
      variant: "ghost",
      messages: []
    },
    {
      title: "Shopping",
      label: "8",
      variant: "ghost",
        messages: []
    },
    {
      title: "Promotions",
      label: "21",
      variant: "ghost",
        messages: []
    },
  ];

app.get("/channels", (req, res) => {
    const channelsInfo = channels.map(({ messages, ...channel }) => channel);
    res.json(channelsInfo);
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('channel select', (channelLabel) => {
        const channel = channels.find(ch => ch.label === channelLabel);
        if(channel) {
            socket.emit('messages', channel.messages);
        }
    });

    socket.on('new message', ({ channelLabel, content }) => {
        const channel = channels.find(ch => ch.label === channelLabel);
        if(channel) {
            const newMessage = {
                id: String(messageId++),
                content
            };
            channel.messages.push(newMessage);
            io.sockets.emit('messages', channel.messages);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
