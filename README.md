# Lesson nodejs

## To run this example:

- `yarn install`
- `yarn start`



## Check work:

- create new terminal tab
- GET return users `curl -X GET http://localhost:3000/users`
- GET return user with id=0 `curl -X GET http://localhost:3000/users?id=0`
- POST add user and return user `curl -X POST http://localhost/users -d '{"name":"New User", "age":20}'`
- PUT updates user with id=0 and return user `curl -X PUT http://localhost/users?id=0 -d '{"name":"New Name", "age":21}'`
- DELETE user with id=0 and return user `curl -X DELETE http://localhost/users?id=0`
- GET return params `curl http://localhost:3000/params?key1=value1`