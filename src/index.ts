import 'dotenv/config';
import { Router, Server, parseJson, parseUrl } from './server';

import users from './users';
import { isValidUser } from './utils';

const router = new Router();
const app = new Server();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('Hello world');
  res.end();
});

router.post('/', (req, res) => {
  res.send(req.body);
});

router.get('/params', (req, res) => {
  res.send(req.params);
});

// users API
router.get('/users', (req, res) => {
  // Get user by id
  if (req.params.id) {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      res.write('User not found');
      res.end();
    }

    res.send(user);
    return;
  }

  // Get all users
  res.send({users});
});

router.post('/users', (req, res) => {
  if (!req.body || !req.body.name || !req.body.age) {
    res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('Bad Request');
    res.end();
    return;
  }

  const userName = String(req.body.name);
  const userAge = Number(req.body.age);
  const userId = users.length;

  const user = {
    id: userId,
    name: userName,
    age: userAge,
  };

  if (!isValidUser(user)) {
    res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('Bad Request');
    res.end();
    return;
  }

  users.push(user);

  res.send(user);
});

router.put('/users', (req, res) => {
  if (!req.body || !req.body.name || !req.body.age) {
    res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('Bad Request');
    res.end();
    return;
  }

  const id = Number(req.params.id);

  if (!users[id]) {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      res.write('User not found');
      res.end();
      return;
  }

  const name = String(req.body.name);
  const age = Number(req.body.age);
  
  const user = {
    id: id,
    name: name,
    age: age,
  };

  if (!isValidUser(user)) {
    res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('Bad Request');
    res.end();
    return;
  }

  users[id] = user;

  res.send(user);
});

router.delete('/users', (req, res) => {
  const id = Number(req.params.id);

  if (!users[id]) {
    res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
      res.write('User not found');
      res.end();
      return;
  }

  const user = users.splice(id, 1)[0];
  res.send(user);
});

app.use(parseJson);
app.use(parseUrl(process.env.SERVER_PATH));
app.addRouter(router);

app.listen(Number(process.env.SERVER_PORT), () =>
  console.log(`Server started on PORT ${process.env.SERVER_PORT}`)
);
