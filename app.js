const express = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use(express.json())

app.get('/',(req, res)=> {
    res.send('Hola mundo')
})

//Crear un registro
app.post('/post', async(req, res) =>{
    const {title, content} = req.body
    const result = await prisma.post.create({
        data: {
            title,content
        }
    })
    res.json(result)
})

//Mostrar todos los registros
app.get('/get', async(req, res)=>{
    const get = await prisma.post.findMany()
    res.json(get) 
})

//Actualizar un registro
app.put('/put/:id', async(req,res)=>{
    const {id} = req.params
    const {title,content} = req.body
    const put = await prisma.post.update({
        where: {id: Number(id)},
        data: {title, content}
    })
    res.json(put)
})  

//Eliminar  un registro
app.delete('/delete/:id', async(req,res)=>{
    const {id} = req.params
    const post = await prisma.post.delete({
            where: {id: Number(id)}
    })
    res.json('DELETE')
})

app.listen(3000, ()=> 
    console.log('Server ready at: htt://localhost:3000')
)