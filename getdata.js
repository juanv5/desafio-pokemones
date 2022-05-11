//1. Hacer uso de Async/Await para las funciones que consulten los endpoints de la
//pokeapi.








const axios = require('axios')



const getPokemon = async() => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=50`)
        return data.results
    }
    //llamado a la apique devuelve datos de un objeto
const getPokemonData = async(name) => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return data
    }
    //llamado a la constante getdata 
const getData = async() => {
    return new Promise((resolve, reject) => {
        const pokemones = []
        const pokeImgName = []
        getPokemon().then((results) => {
            results.forEach((p) => {
                const { name } = p
                pokemones.push(getPokemonData(name))
            })

            //2. Usar el Promise.all() para ejecutar y obtener la data de las funciones asíncronas
            //generando un nuevo arreglo con la data a entregar en el siguiente requerimiento.



            Promise.all(pokemones).then((data) => {
                data.forEach((p) => {
                    const img = p.sprites.front_default
                    const nombre = p.name
                    pokeImgName.push({ img, nombre })
                })
                resolve(pokeImgName) //esto es lo que devuelve pokeImgname
            })
        })
    })
}
module.exports = getData