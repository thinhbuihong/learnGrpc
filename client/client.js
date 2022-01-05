const grpc = require('grpc');
const greets = require('../server/proto/greet_pb');
const cal = require('../server/proto/cal_pb');
const service = require('../server/proto/greet_grpc_pb');
const calService = require('../server/proto/cal_grpc_pb');
const { sleep } = require('../server');


async function bi() {
	const client = new service.GreetServiceClient(
		'localhost:50051',
		grpc.credentials.createInsecure()
	)

	const greeting = new greets.Greeting()
	greeting.setFirstName("jerry");
	greeting.setLastName("tom");

	const biRequest = greets.GreetEveryoneRequest()
	const biCall = client.greetEveryone(biRequest, (error, response) => {
		console.log('server response: ' + response)
	})

	biCall.on('data', response => {
		console.log('hello client', response.getResult())
	})

	biCall.on('error', error => console.error(error))

	biCall.on('end', () => {
		console.log('client the end')
		process.exit()
	})

	for (let i = 0; i < 10; i++) {
		const request = new greets.GreetEveryoneRequest();
		request.setGreet(greeting);

		biCall.write(request);

		await sleep(1500)
	}

	biCall.end()

	console.log('end client')
}

function main() {
	// const client = new service.GreetServiceClient(
	// 	'localhost:50051',
	// 	grpc.credentials.createInsecure()
	// )
	// const sumClient = new service.SumServiceClient(
	// 	'localhost:50051',
	// 	grpc.credentials.createInsecure()
	// )

	// const request = new greets.GreetRequest()

	//crete a protocol buffer message
	// const greeting = new greets.Greeting()
	// greeting.setFirstName("jerry");
	// greeting.setLastName("tom");

	//set the greeting
	// request.setGreeting(greeting)

	//method khai bao trong proto file va implement ben server
	// client.greet(request, (error, response) => {
	// 	if (!error) {
	// 		console.log("greeting response: ", response.getResult())
	// 	} else {
	// 		console.error(error)
	// 	}
	// })

	//sum
	// const sumRequest = new greets.SumRequest();
	// const sum = new greets.Sum();
	// sum.setA(4);
	// sum.setB(5);
	// sumRequest.setSum(sum);
	// sumClient.sum(sumRequest, (error, response) => {
	// 	if (!error) {
	// 		console.log("sum response: ", response.getResult())
	// 	} else {
	// 		console.error(error)
	// 	}
	// })

	/////////greetManyTimes
	// const greetManyTimesRequest = new greets.GreetManyTimesRequest();
	// greetManyTimesRequest.setGreeting(greeting)
	// const call = client.greetManyTimes(greetManyTimesRequest, () => { });

	// call.on('data', (response) => {
	// 	console.log('streaming response ', response.getResult())
	// })
	// call.on('status', status => {
	// 	console.log(status)
	// })
	// call.on('error', error => console.error(error))
	// call.on('end', () => {
	// 	console.log('streaming ended')
	// })

	// const calClient = new calService.CalculatorServiceClient(
	// 	"localhost:50051",
	// 	grpc.credentials.createInsecure()
	// )

	// const calRequest = new cal.PrimeNumberDecompositionRequest();
	// calRequest.setNumber(11);

	// const call = calClient.primeNumberDecomposition(calRequest, () => { })

	// call.on('data', (response) => {
	// 	console.log('prime factors found: ', response.getPrimeFactor())
	// })
	// call.on('status', status => {
	// 	console.log(status)
	// })
	// call.on('error', error => console.error(error))
	// call.on('end', () => {
	// 	console.log('streaming ended')
	// })

	//longGreeting
	// const longGreetRequest = new greets.LongGreetRequest();
	// const longGreetCall = client.longGreet(longGreetRequest, (error, response) => {
	// 	if (!error) {
	// 		console.log('server response: ', response.getResult())
	// 	} else {
	// 		console.error(error)
	// 	}
	// })

	// let count = 0, intervalId = setInterval(function () {
	// 	console.log('sending message ' + count)

	// 	const request = new greets.LongGreetRequest();
	// 	request.setGreet(greeting)
	// 	longGreetCall.write(request)

	// 	if (++count > 3) {
	// 		clearInterval(intervalId);
	// 		longGreetCall.end()
	// 	}
	// }, 1000)

	bi()
}

main()
