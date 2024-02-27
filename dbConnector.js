// const fastify = require('fastify')()

// fastify.register(require('@fastify/postgres'), {
//   connectionString: 'postgres://postgres@localhost/postgres'
// })

// fastify.get('/user/:id', (req, reply) => {
//   fastify.pg.connect(onConnect)

//   function onConnect (err, client, release) {
//     if (err) return reply.send(err)

//     client.query(
//       'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
//       function onResult (err, result) {
//         release()
//         reply.send(err || result)
//       }
//     )
//   }
// })

// fastify.listen({ port: 3000 }, err => {
//   if (err) throw err
//   console.log(`server listening on ${fastify.server.address().port}`)
// })