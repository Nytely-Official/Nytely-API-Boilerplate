//Setup the Imports
import { NextFunction, Request, Response } from "express";
import { Nytely_Endpoint, Nytely_Endpoint_Function } from "../../../helpers";

//Setup the Endpoint Data
export default new Nytely_Endpoint({
	Name: "/example_alpha",
	Permissions: [""],
	GET_Handler,
});

//Setup the Get Handler Function
function GET_Handler(req: Request, res: Response, next: NextFunction) {}
