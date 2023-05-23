//Imports
import DotENV from "dotenv";
import Express from "express";

//Import Internal Modules
import { Router } from "./Router/Router";
import { Nytely_CORS_Manager, Nytely_Client } from "./helpers";

//Setup the Environment
DotENV.config({ path: `${process.cwd()}/.env` });

//Setup the CORS Manager
const CORS_Manager = new Nytely_CORS_Manager();

//Setup Express
const App = Express();

//Intercept and Handle CORS Requests
App.use(CORS_Manager.Interceptor);

//Setup Body Parser
App.use(Express.json());

//Handle Endpoint Routing
App.use(Router);

//Setup the Client
const Client = new Nytely_Client();

//Start the Express Server.
App.listen(process.env.Port, () => {
	//
	//Log Succesful Server Start
	console.log(`Started Web Server on ${process.env.Port}`);
});
