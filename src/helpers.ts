//Import External Types
import { Request, Response, NextFunction } from "express";

//Setup the Client Class
export class Nytely_Client {
	//
	//Setup the Properties

	//Constrcutor
	constructor() {
		//
		//Setup the Initial Variables
	}

	//Methods
}

//Setup the Endpoint Manager Class
export class Nytely_Endpoint_Manager {
	//
	//Setup the Properties
	#Endpoints: Map<string, Nytely_Endpoint> = new Map();

	//Methods
	Add_Endpoint(Endpoint: Nytely_Endpoint) {
		//
		//Add the New Endpoint
		this.#Endpoints.set(Endpoint.Name, Endpoint);
	}

	Get_Endpoint(Name: string, Method: Nytely_Request_Method): Nytely_Endpoint_Function | null {
		//
		//Get the Requested Endpoint
		const Requested_Endpoint = this.#Endpoints.get(Name);

		//Check if the Requested Endpoint Does not Exist
		if (!Requested_Endpoint) return null;

		//Get the Requested Endpoint's Function
		const Requested_Endpoint_Function = Requested_Endpoint[Method];

		//Check if the Requested Endpoint's Function does not Exist
		if (!Requested_Endpoint_Function) return null;

		//Return the Endpoints
		return Requested_Endpoint_Function;
	}

	get Endpoints(): Map<string, Nytely_Endpoint> {
		//
		//Return the Endpoints List
		return this.#Endpoints;
	}
}

//Setup the Endpoint Class
export class Nytely_Endpoint {
	//
	//Setup the Properties
	Name: string;
	Permissions: Array<Nytely_Permissions>;

	//Setup the Constructor
	constructor({ Name, Permissions, GET_Handler, POST_Handler }: Nytely_Endpoint_Parameters) {
		//
		//Setup the Properties
		this.Name = Name;
		this.Permissions = Permissions;

		//Setup the Methods
		this.GET = GET_Handler;
		this.POST = POST_Handler;
	}

	//Setup the Methods
	GET?: Nytely_Endpoint_Function;
	POST?: Nytely_Endpoint_Function;
}

//Setup the Nytely Endpoint Parameters Interface
interface Nytely_Endpoint_Parameters {
	Name: string;
	Permissions: Array<Nytely_Permissions>;
	GET_Handler?: Nytely_Endpoint_Function;
	POST_Handler?: Nytely_Endpoint_Function;
}

//Setup the CORS Manager Class
export class Nytely_CORS_Manager {
	//
	//Setup the Properties
	#Allowed_Headers: Array<string>;
	#Allowed_Origins: Array<string>;

	//Setup the Constructor
	constructor() {
		//
		//Setup the Properties
		this.#Allowed_Headers = ["content-type", "authorization"];
		this.#Allowed_Origins = ["*"];
	}

	//Setup the Methods
	Interceptor(req: Request, res: Response, next: NextFunction): void {
		//
		//Get the Request Origin
		const Request_Origin = String(req.get("origin"));

		//Get the Request Origin Array
		const Request_Origin_Array = Request_Origin.split("://");

		//Remove the Protocol from the Request Origin if a Protocol Exists
		if (Request_Origin_Array.length > 1) Request_Origin_Array.shift();

		//Get the Request Origin Host
		const Request_Origin_Host = Request_Origin_Array.join()
			.replace(/(\/).*|(:).*/, "")
			.replace(/^www\./, "");

		//Check if the Requested Origin is Allowed
		const Origin_Allowed = this.Check_Origin(Request_Origin_Host);

		//Check if the Requested Origin is not Allowed
		if (!Origin_Allowed) return this.#Deny_Access(res);

		//Update the Allowed Headers
		res.set("Access-Control-Allow-Headers", this.Allowed_Headers.join(","));

		//Add the Origin Allow Header to the Response
		res.set("Access-Control-Allow-Origin", Request_Origin);

		//Check if the Incoming Request is an Options (CORS) request
		if (req.method.toLowerCase() == "options") return this.#Allow_Access(res);

		//Allow the Host through CORS Check
		return next();
	}

	get Allowed_Headers(): Array<string> {
		//
		//Return the Allowed Origins List
		return this.#Allowed_Headers;
	}

	get Allowed_Origins(): Array<string> {
		//
		//Return the Allowed Origins List
		return this.#Allowed_Origins;
	}

	Check_Header(Requested_Header: string): boolean {
		//
		//Check if the Requested Header is Allowed
		const Header_Allowed = this.Allowed_Headers.includes(Requested_Header);

		//Return the Result of the Header Check
		return Header_Allowed;
	}

	Check_Origin(Requested_Origin: string): boolean {
		//
		//Check if the Requested Origin is Allowed
		const Origin_Allowed = this.Allowed_Origins.includes(Requested_Origin);

		//Return the Result of the Header Check
		return Origin_Allowed;
	}

	#Deny_Access(res: Response): void {
		//
		//Set the Status of the Response
		const Response_Status = 403;

		//Set the Message of the Response
		const Response_Message = "CORS: Access denied for this Host";

		//End the Request and Respond to the Requestor
		res.status(Response_Status).send(Response_Message);
	}

	#Allow_Access(res: Response): void {
		//
		//Set the Status of the Response
		const Response_Status = 200;

		//Set the Message of the Response
		const Response_Message = "CORS: Access allowed for this Host";

		//End the Request and Respond to the Requestor
		res.status(Response_Status).send(Response_Message);
	}
}

//Setup the Endpoint Function Type
export type Nytely_Endpoint_Function = (req: Request, res: Response, next: NextFunction) => void;

//Setup the Request Method Type
export type Nytely_Request_Method = "GET" | "POST";

//Setup the Permissions Type
export type Nytely_Permissions = "";
