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
const categoriesController = (fastify,options,done) =>{
    // fastify.get('/', options, (req,rep)=>{

    fastify.get('/', function (req, reply) {
        fastify.pg.query(
            'SELECT * FROM categories',
          function onResult (err, result) {
            reply.send(err || result.rows)
          }
        )
      })
      fastify.post('/', function(req,rep){
        const bodyData = req.body.data
        fastify.pg.query(
            // `INSERT INTO todo (date, name, description, category)
            // VALUES ('2024-02-22', 'Название', 'Описание', 'Категория');`,
            `INSERT INTO categories (name, styles, icon_name)
            VALUES ('${bodyData.name}', '${bodyData.styles}', '${bodyData.icon_name}')`,
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
export default categoriesController