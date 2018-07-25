const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

export default function startServer(store) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  app.use(express.static(path.join(__dirname, 'public/')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
  });

  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`Listening on port ${port}...`));

  store.subscribe(() => io.emit('state', store.getState().toJS()));
  io.on('connection', socket => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', action => store.dispatch(action));
    console.log('Connection', store.getState());
  });
}
