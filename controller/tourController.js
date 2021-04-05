const fs = require("fs");

//get All Data Tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//Object Data
class Tour{
    constructor(input){
        this.duration = input.duration;
    }
}

exports.checkBody = (req,res,next) => {
    console.log(req.body);
    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status:'fail',
            message:'didnt have name or proce'
    
        });
    }
    next();
}

exports.checkID = (req,res,next,val) => {
    console.log(`param middleware ${val}`);
    const tourIndex = tours.findIndex( el => el.id === val * 1);
    if(tourIndex === undefined || tourIndex == -1){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
    
        });
    }
    next();
}

exports.getAllTours = (req,res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        requestTime:req.requestTime,
        result:tours.length,
        data:{
            tours
        }

    });
}

exports.getOneTour = (req,res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);
    
    res.status(200).json({
        status:'success',
        data:{
            tour
        }

    });
    
}

exports.updateTour = (req,res) => {
    const id = req.params.id * 1;
    const tour = tours.find( el => el.id === id);
    const tourUpdate = new Tour(req.body);
    
    tour.duration = tourUpdate.duration

    const index = tours.findIndex( el => el.id === id);
    tours[index] = tour;

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
        res.status(201).json({
            'status':'Success',
            data:{
                tour:tour
            }
        })
    })

   
}

exports.deleteOneTour = (req,res) => {
    const id = req.params.id * 1;
    const tourIndex = tours.findIndex( el => el.id === id);
    tours.splice(tourIndex,1);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
        res.status(201).json({
            'status':'Success',
            'index':tourIndex
        })
    })
}

exports.insertTour = (req,res)=> {

    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
        res.status(201).json({
            'status':'Success',
            data:{
                tour:newTour
            }
        })
    })
}