//Base Setup
//====

//call the packages
var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var House = require('./app/models/house');
var Usage = require('./app/models/usage');
var IP = require('./app/models/ipaddresses');

//Include the DB
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/plug', function(err){
   if (err){
	console.log('connection error', err);
   }else{
	console.log('connection successful');
   }
});


//configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//Routes for the API
//===
var router = express.Router();
//middleware
router.use(function(req, res, next){
  //do the logging
  console.log('something is happening.');
  next();
});

//middleware 2
router.use(function(req,res,next){
 var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
 console.log('client IP:', ip);
 
//store the IP address
 var storeip = new IP();
  storeip.ip = ip;
 //save the data
  storeip.save(function(err){
       if(err)
       res.send(err);
       res.json({message: 'IP stored successfully!'});  
 });
 next();
});

router.get('/', function(req,res){
	res.json({message:'Hooray!welcome to our api!'});
});

//more routes for our API

//on the houses that end in /usage
router.route('/usage')
	//create usage data (accessed at POST http://localhost:8080/api/usage)

	.post(function(req, res){

	//create new usage data
	var usage = new Usage();

	//collect data from the request
	usage.kitchenKWH = req.body.kitchenKWH;
	usage.lightsKHW = req.body.lightsKWH;
	usage.socketsKWH = req.body.socketsKWH;
	usage.showerKWH = req.body.showerKWH;
	usage.simNo = req.body.simNo;

	//save the usage data
	usage.save(function(err){
	  if(err)
	    res.send(err);
	    res.json({message: 'usage data stored!'});
	  });
        })
	
	//get all the usage data (at GET http://localhost:8080/api/usage)
	.get(function(req,res){
		Usage.find(function(err,usage){
		    if (err)
			res.send(err);
			res.json(usage);
		});
	});


//on the routes that end in /houses
router.route('/houses')
	
	//create a house (that can be accessed at POST http://localhost:8080/api/houses)
	
	.post(function(req,res) {
	//create a new instance of house
	var house = new House();
	//set the house details from the request
	house.name = req.body.name;
	house.estate = req.body.estate;
	house.rooms = req.body.rooms;
	house.kitchenCT = req.body.kitchenCT;
	house.lightsCT = req.body.lightsCT;
	house.socketsCT = req.body.socketsCT;
        house.showerCT = req.body.showerCT;
	house.simNo = req.body.simNo;
	
	house.save(function(err){
          if(err)
	    res.send(err);
	    res.json({message: 'House created!'});
	  });
	})
	//get all the houses (accessed at Get http://localhost:8080/api/houses)
	.get(function(req,res){
	  House.find(function(err, houses){
            if(err)
	      res.send(err)
	      res.json(houses);
	    });
	})
	//update house information
	.put(function(req, res){
	
	//use the House model to find the house we want
	House.findById(req.params.bear_id, function(err, house){
	 if(err)
	   res.send(err);
	    house.name = req.body.name;
            house.estate = req.body.estate;
            house.rooms = req.body.rooms;
            house.kitchenCT = req.body.kitchenCT;
            house.lightsCT = req.body.lightsCT;
            house.socketsCT = req.body.socketsCT;
            house.showerCT = req.body.showerCT;
            house.simNo = req.body.simNo;

            house.save(function(err){
            if(err)
            res.send(err);
            res.json({message: 'House created!'});
            });

	  });
	});

//Register routes ---
//All routes prefixed with /api
app.use('/api',router);

//Start the server
//===
app.listen(port);
console.log('Magic happens on port' + port);
