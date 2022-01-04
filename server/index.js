const greets = require('../server/proto/greet_pb');
const service = require('../server/proto/greet_grpc_pb');
const cal = require('../server/proto/cal_pb')
const calService = require('../server/proto/cal_grpc_pb')
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

function greetManyTimes(call, callback) {
	const firstName = call.request.getGreeting().getFirstName()


	let count = 0, intervalId = setInterval(() => {
		const greetManyTimesResponse = new greets.GreetManyTimesResponse();
		greetManyTimesResponse.setResult(firstName);

		//setup streaming
		call.write(greetManyTimesResponse);
		if (++count > 9) {
			clearInterval(intervalId)
			call.end() //we have sent all message
		}

	}, 1000)

}

function primeNumberDecomposition(call, callback) {
	let number = call.request.getNumber();

	let divisor = 2;
	while (number > 1) {
		if (number % divisor === 0) {
			const primeNumberDecompositionResponse = new cal.PrimeNumberDecompositionResponse();
			primeNumberDecompositionResponse.setPrimeFactor(divisor);

			number = number / divisor;

			call.write(primeNumberDecompositionResponse)
		} else {
			divisor++;
			console.log('divisor has increase to: ', divisor)
		}
	}

	call.end()
}

function longGreet(call, callback) {
	call.on('data', request => {
		const fullName = request.getGreet().getFirstName() + ' ' +
			request.getGreet().getLastName()

		console.log('hello ', fullName);
	})

	call.on('error', error => {
		console.error(error)
	})

	call.on('end', () => {
		const response = new greets.LongGreetResponse();
		response.setResult('long greet client streaming....')
		callback(null, response)
	})
}

function main() {
	const server = new grpc.Server()

	server.addService(service.GreetServiceService, {
		greet,
		greetManyTimes,
		longGreet
	})
	server.addService(service.SumServiceService, {
		sum,
	})
	server.addService(calService.CalculatorServiceService, {
		primeNumberDecomposition
	})

	server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
	server.start()

	console.log('server running on port 127.0.0.1:50051')
}
main()