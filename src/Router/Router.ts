//Imports
import { readdirSync, statSync } from "fs";
import { Request, Response, NextFunction } from "express";
import { Nytely_Endpoint, Nytely_Endpoint_Manager } from "../helpers";

//Setup the Constants
const Endpoint_Manager = new Nytely_Endpoint_Manager();

//Start Importing the Endpoints
Import_Endpoints();

//Setup the Main Router
export function Router(req: Request, res: Response, next: NextFunction) {}

//Setup the Endpoint Importer Function
function Import_Endpoints() {
	//
	//Setup the Base Path
	const Base_Path = `${__dirname}\\Endpoints`;

	//Get the Directory of Each Endpoint
	const Endpoint_Directory_List = readdirSync(Base_Path);

	//Loop through the Endpoint List
	for (const Endpoint_Directory of Endpoint_Directory_List) {
		//
		//Get the Full Path of the Endpoint's Directory
		const Endpoint_Directory_Path = `${Base_Path}\\${Endpoint_Directory}`;

		//Get the Status of the Given Endpoint Directory
		const Endpoint_Directory_Status = statSync(Endpoint_Directory_Path);

		//Check if the Endpoint Directory is Invalid
		if (!Endpoint_Directory_Status.isDirectory()) continue;

		//Get the Main Endpoint's Path
		const Main_Endpoint_Path = `${Endpoint_Directory_Path}\\${Endpoint_Directory}.ts`;

		//Get the Main Endpoint from the Current Endpoint Directory
		const Endpoint: Nytely_Endpoint | undefined = require(Main_Endpoint_Path);

		//Check if the Endpoint is Invalid
		if (!Endpoint) continue;

		//Add the Endpoint to the List
		Endpoint_Manager.Add_Endpoint(Endpoint);
	}

	console.log(Endpoint_Manager.Endpoints);
}
