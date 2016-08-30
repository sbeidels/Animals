/*Sarah Beidelschies
  CS290 Database and UI interactions
  server js file
*/

var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 3000);


var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

/*on page load, send table contents, render home page */
app.get('/', function(req, res, next) {
	  var context = {};
	  pool.query('SELECT * FROM animalData', function (err, rows, fields) {
		  if(err) {
			  next(err);
			  return;
		  }
		  context.results = JSON.stringify(rows);
		  
		 res.render('home', context);
	  });
  });




app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS animalData", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE animalData("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "species VARCHAR(255),"+
    "breed VARCHAR(255),"+
    "dob DATE,"+
    "dateIn DATE)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});


/*send table contents to client js file via json object*/
app.get('/table', function(req, res, next) {
			
	  var context = {};
	  pool.query('SELECT * FROM animalData', function (err, rows, fields) {
		  if(err) {
			  next(err);
			  return;
		  }
		  context.results = JSON.stringify(rows);
		  
		  res.type('json');
		  res.send(context);
		  
	  });
  }); 

/*insert user input into table and send update table contents to client js file via json object*/  
app.post('/insert',function(req,res,next){
  var context = {};
  pool.query("INSERT INTO animalData (`name`, `species`, `breed`, `dob`, `dateIn`) VALUES (?,?,?,?,?)", [req.body.name, req.body.species, req.body.breed, req.body.dob, req.body.dateIn], function(err, result){  //note the back tick `
    if(err){
      next(err);
      return;
    }
	pool.query('SELECT * FROM animalData', function (err, rows, fields) {
		  if(err) {
			  next(err);
			  return;
		  }
		  context.results = JSON.stringify(rows);
		  res.type('json');
		  res.send(context);
  });
});  

});

/*delete user specified row from table and send back updated table contents to client js file via json object*/
app.post('/delete',function(req,res,next){
  var context = {};
   
  pool.query("DELETE from animalData WHERE id = ?", [req.body.id], function(err, result){  //note the back tick `
    if(err){
      next(err);
      return;
    }
	pool.query('SELECT * FROM animalData', function (err, rows, fields) {
		  if(err) {
			  next(err);
			  return;
		  }
		  context.results = JSON.stringify(rows);
          res.type('json');
		  res.send(context);
  });
});  

});



/*set query id to context.id.  Render new page 'update' */
app.get('/logID', function(req,res,next) {
	var context = {};
	context.id = req.query.id;
	res.render('update', context);
});


/*get row data based on user input id.  Send row contents to client js as json object*/
app.post('/getRow', function(req,res,next){
  var context = {};
  	pool.query('SELECT * FROM animalData WHERE id = ?', [req.body.id], function (err, result) {
		  if(err) {
			  next(err);
			  return;
		  }
		  else {
			  context.results = JSON.stringify(result);
			  res.type('json');
			  res.send(context);
			 
		  }
	});
});  

/*update row with user input id based on new user input.  Send updated table contents to client js file as json object*/
app.post('/update',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM animalData WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      pool.query("UPDATE animalData SET name=?, species=?, breed=?, dob=?, dateIn=? WHERE id=? ", [req.body.name, req.body.species, req.body.breed, req.body.dob, req.body.dateIn, req.body.id], function(err, result){
        if(err){
          next(err);
          return;
         }
        
        else {
			
			  context.results = JSON.stringify(result);
			  
			res.type('json');
			res.send(context);
		}
        
	});
    }
  });
});
  
 
/*error handling/listener handling */
app.use(function(req, res) {
	
  res.status(404);
  //res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
 // res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http:localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});