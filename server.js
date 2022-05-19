// server.js

// set up ======================================================================
const express = require('express');
const app = express();
const auth = require('./config/auth');
const msal = require('@azure/msal-node');

// configuration ===============================================================
// use public folder for js, css, imgs, etc
app.use(express.static('static'));
app.use(express.static(`${__dirname}/ui-react/build`));

// Read the .env-file
require('dotenv').config();

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(auth.msalConfig);

// routes ======================================================================
require('./app/routes.js')(app);

// launch ======================================================================
const port = process.env.PORT || 8080;

var theserver = app.listen(port, function() {
	// call controller functions -------------------------------------------------
	const io = require('socket.io')(theserver);

	// controller if using room lists
	var controller = require('./app/socket-controller.js')(io);

	// log something so we know the server is working correctly
	console.log(`now we're cooking.`);
});
