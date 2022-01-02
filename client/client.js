const grpc = require('grpc');
const greets = require('../server/proto/greet_pb');
const service = require('../server/proto/greet_grpc_pb');


function main() {
	const client = new service.GreetServiceClient(
		'localhost:50051',
		grpc.credentials.createInsecure()
	)
	const sumClient = new service.SumServiceClient(
		'localhost:50051',
		grpc.credentials.createInsecure()
	)

	const request = new greets.GreetRequest()

	//crete a protocol buffer message
	const greeting = new greets.Greeting()
	greeting.setFirstName("jerry");
	greeting.setLastName("tom");

	//set the greeting
	request.setGreeting(greeting)

	//method khai bao trong proto file va implement ben server
	client.greet(request, (error, response) => {
		if (!error) {
			console.log("greeting response: ", response.getResult())
		} else {
			console.error(error)
		}
	})

	//sum
	const sumRequest = new greets.SumRequest();
	const sum = new greets.Sum();
	sum.setA(4);
	sum.setB(5);
	sumRequest.setSum(sum);
	sumClient.sum(sumRequest, (error, response) => {
		if (!error) {
			console.log("sum response: ", response.getResult())
		} else {
			console.error(error)
		}
	})
}

main()