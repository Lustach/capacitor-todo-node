import {formateDate} from '../utils/date.js';
const responseSchema={
    response:{
        200:{
            properties:{
                message: {type: 'string'},
            },
            // required: ['message']
        }
    }
}
const todoController = (fastify,options,done) =>{
    // fastify.get('/', options, (req,rep)=>{
    fastify.get('/',{schema: responseSchema}, (req,rep)=>{
        // const data = 
        // fastify.pg.query(
        //     'SELECT * FROM todo',
        //     function onResult (err, result) {
        //       rep.send(err || result)
        //     //   console.log(err,result.rows)
        //     }
        //   )
        return {
            message: 'haha'
        }
    })

    fastify.get('/:name', {schema: responseSchema}, (req,rep)=>{
        return {
            message2: `Hello ${req.params.name}`
        }
    })

    fastify.get('/todos', function (req, reply) {
        fastify.pg.query(
            'SELECT * FROM todo',
          function onResult (err, result) {
            reply.send(err || result.rows)
          }
        )
      })
      fastify.delete('/todos/:id', function (req, reply) {
        console.log(req.params.id)
        fastify.pg.query(
            `DELETE FROM todo WHERE id = ${req.params.id};`,
          function onResult (err, result) {
            console.log(req.params,req,'req')
            reply.send(err || result.rows)
          }
        )
      })
      fastify.post('/todos', function(req,rep){
        const bodyData = req.body.data
        const formattedDate = formateDate(bodyData.date);
        fastify.pg.query(
            // `INSERT INTO todo (date, name, description, category)
            // VALUES ('2024-02-22', 'Название', 'Описание', 'Категория');`,
            `INSERT INTO todo (date, name, description, category)
            VALUES (TO_DATE('${formattedDate}', 'YYYY-MM-DD'), '${bodyData.name}', '${bodyData.description}', '${bodyData.category}')`,
            function onResult (err, result) {
                rep.send(err || result.rows)
            }
        )
      })
    //   fastify.post('/todos', function (req, reply) {
    //     fastify.pg.query(
    //         'SELECT * FROM todo',
    //         [req.params],
    //       function onResult (err, result) {
    //         reply.send(err || result.rows)
    //       }
    //     )
    //   })

    done();
}
export default todoController