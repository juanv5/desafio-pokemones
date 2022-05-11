const http = require('http')
const url = require('url')
const fs = require('fs')
const getData = require('./getdata')


//se crea el servidor y la funcion es asincroma para ingresar a la getdata
http.createServer(async(req, res) => {


        //3. Disponibilizar la ruta http://localhost:3000/pokemones que devuelva un JSON con el
        //nombre y la url de una imagen de 150 pokemones, asi como verás en la siguiente
        //imagen.


        const urlParse = url.parse(req.url, true)
        if (urlParse.pathname === '/') { //cuando se ingresa a la rutade la paginaejecutara lo que esta adentro del if
            res.writeHead(200, { 'Content-Type': 'text/html' })
            fs.readFile('index.html', 'utf-8', (err, data) => {
                if (err) res.end('No se encontró el archivo html') //si es que existe un error, escribe un mensaje
                else res.end(data) //si no, entrega data
            })
        }
        if (req.url == '/pokemones') { //cuando se haga un request a /pokemones se ejecuta lo de abajo
            const pokeImgName = await getData() //esta constante guarda el contenido del getdata
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(pokeImgName)) //lo deja como archivo json
            res.end()
        }
    })
    .listen(3000, () => {
        console.log('el servidor se esta ejecutando')
    })