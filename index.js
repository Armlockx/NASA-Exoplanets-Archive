const {parse} = require('csv-parse');   //const parse = require('csv-parse'); == error!
const fs = require('fs');

const HabitablePlanets = [];

function isHabitablePLanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

//EVENT HANDLER
fs.createReadStream('kepler_data.csv')
    .on('open', () => {
        console.log('File opened!');
    })
    .pipe(parse({
        comment: '#',       //uses the 'parse' object to format the csv to a
        columns: true,      //readable way for nodejs to work with
    }))
    .on('data', (data) => {
        if(isHabitablePLanet(data)){
            HabitablePlanets.push(data); //  Reads the .csv and adds it to the const "HabitablePlanets" on the event "data",
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        //console.log(HabitablePlanets);    //Shows all the objects in the array
        console.log(`${HabitablePlanets.length} habitable planets found!`);
        console.log(HabitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }))
    })
//EVENT HANDLER

//Habitable.map() runs a function that returns just the name of each object in the array 'HabitablePlanets'