const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

export default function startServer(store) {
  app.use(express.static(path.join(__dirname, 'build/')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/build/index.html`));
  });

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Listening on port ${port}`));

  store.subscribe(() => io.emit('state', store.getState().toJS()));
  io.on('connection', socket => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
    console.log('Connection', socket);
  });
}
