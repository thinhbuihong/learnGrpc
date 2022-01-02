const greets = require('../server/proto/greet_pb');
const service = require('../server/proto/greet_grpc_pb');
const grpc = require('grpc')


/*
	Implement the greet RPC method
*/
function greet(call, callback) {
	const greeting = new greets.GreetResponse();

	greeting.setResult(
		"hello " + call.request.getGreeting().getFirstName() +
		call.request.getGreeting().getLastName()
	)

	callback(null, greeting)
}

function sum(call, callback) {
	const sum = new greets.SumResponse();


	sum.setResult(
		call.request.getSum().getA() +
		call.request.getSum().getB()
	)

	callback(null, sum)
}

function main() {
	const server = new grpc.Server()

	server.addService(service.GreetServiceService, {
		greet,
	})
	server.addService(service.SumServiceService, {
		sum,
	})

	server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
	server.start()

	console.log('server running on port 127.0.0.1:50051')
}
main()