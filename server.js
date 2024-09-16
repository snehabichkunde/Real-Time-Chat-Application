const express = require('express')
const app = express()

const http = require('http').createServer(app)

const PORT = 3000;

http.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/style'))
app.use(express.static(__dirname + '/js'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})


// Socket 

const io = require ('socket.io')(http)


io.on('connection', (socket)=>{
    console.log('connected...')

    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg);
    })

   // console.log("checking")

})