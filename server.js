import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();

const database = new DatabasePostgres();

//List
server.get('/videos', async (request, reply) => {
  const querySearch = request.query.search;

  const videos = await database.list(querySearch);

  return videos;
});

//Create
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body;
  
  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

//Update
server.put('/videos/:id', async (request, reply) => {
  const { title, description, duration } = request.body;
  const videoId = request.params.id;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

//Delete
server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});


server.listen({
  port: process.env.PORT ?? 3333,
});





// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//   response.write('Hello World');

//   return response.end();
// });

// server.listen(3333); 