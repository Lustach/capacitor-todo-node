import Fastify from 'fastify'
import { fastifyPostgres } from '@fastify/postgres'
import todoController from '../controllers/todo.controller.js'
import categoriesController from '../controllers/categories.controller.js'
import cors from '@fastify/cors'
const app=Fastify({
    logger: true
})
app.register(todoController)//,{prefix: '/greetings'}
app.register(categoriesController,{prefix: '/categories'})
await app.register(cors, { 
    // put your options here
})
const options = {
    schema:{
        querystring:{
            properties:{
                lastName: {type: 'string'}
            },
            required: ['lastName']
        },
        params: {
            properties:{
                name: {type: 'string'}
            },
            // required: ['name'] смотреть url
        },
        response:{
            200: {
                properties:{
                    message: {type: 'string'}
                },
                required: ['message']
            }
        }
    }
}
// console.log(fastifyPostgres)
app.register(fastifyPostgres, {
    host: 'localhost',
    port: 5432,
    database: 'my-app',
    user: 'postgres',
    password: process.env.PASSWORD,
    max: 20
  })
// console.log(app)
// fastify.route({
//     method: 'GET',
//     url: '/hello/:name',
//     schema: {
//         querystring:{
//             properties:{
//                 lastName: {type: 'string'}
//             },
//             required: ['lastName']
//         },
//         params: {
//             properties:{
//                 name: {type: 'string'}
//             },
//             // required: ['name'] смотреть url
//         },
//         response:{
//             200: {
//                 properties:{
//                     message: {type: 'string'}
//                 },
//                 required: ['message']
//             }
//         }
//     },
//     handler: (req, rep)=>{
//         return{
//             message: `Hello ${req.params.name} ${req.query.lastName}`
//         }
//     }
// })
try{
app.listen({ port: 3002 })
}catch(e){
    app.log.error(e)
    process.exit(1)//stop
}