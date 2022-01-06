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

function sleep(interval) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), interval)
	})
}
async function greetEveryone(call, callback) {
	call.on('data', response => {
		const fullName = response.getGreet().getFirstName() + ' ' +
			response.getGreet().getLastName()
		console.log('hello ' + fullName)
	})

	call.on('error', error => console.error(error))

	call.on('end', () => {
		console.log('the end...')
	})

	for (let i = 0; i < 10; i++) {
		const request = new greets.GreetEveryoneResponse();
		request.setResult('thinhdepzai' + i)

		call.write(request);

		await sleep(1000)

	}

	call.end()
}

function squareRoot(call, callback) {
	const number = call.request.getNumber();

	if (number >= 0) {
		const numberRoot = Math.sqrt(number);
		const response = new cal.SquareRootResponse();

		response.setNumberRoot(numberRoot);
		callback(null, response)
	} else {
		//error handling
		return callback({
			code: grpc.status.INVALID_ARGUMENT,
			message: 'the number being sent is not positive'
		})
	}
}

function main() {
	const server = new grpc.Server()

	server.addService(service.GreetServiceService, {
		greet,
		greetManyTimes,
		longGreet,
		greetEveryone
	})
	server.addService(service.SumServiceService, {
		sum,
	})
	server.addService(calService.CalculatorServiceService, {
		primeNumberDecomposition,
		squareRoot
	})

	server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
	server.start()

	console.log('server running on port 127.0.0.1:50051===')
}
main()
module.exports.sleep = sleep;