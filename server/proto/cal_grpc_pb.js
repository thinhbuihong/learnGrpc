// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_cal_pb = require('../proto/cal_pb.js');

function serialize_calculator_PrimeNumberDecompositionRequest(arg) {
  if (!(arg instanceof proto_cal_pb.PrimeNumberDecompositionRequest)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionRequest(buffer_arg) {
  return proto_cal_pb.PrimeNumberDecompositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionResponse(arg) {
  if (!(arg instanceof proto_cal_pb.PrimeNumberDecompositionResponse)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionResponse(buffer_arg) {
  return proto_cal_pb.PrimeNumberDecompositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SquareRootRequest(arg) {
  if (!(arg instanceof proto_cal_pb.SquareRootRequest)) {
    throw new Error('Expected argument of type calculator.SquareRootRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SquareRootRequest(buffer_arg) {
  return proto_cal_pb.SquareRootRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SquareRootResponse(arg) {
  if (!(arg instanceof proto_cal_pb.SquareRootResponse)) {
    throw new Error('Expected argument of type calculator.SquareRootResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SquareRootResponse(buffer_arg) {
  return proto_cal_pb.SquareRootResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  primeNumberDecomposition: {
    path: '/calculator.CalculatorService/PrimeNumberDecomposition',
    requestStream: false,
    responseStream: true,
    requestType: proto_cal_pb.PrimeNumberDecompositionRequest,
    responseType: proto_cal_pb.PrimeNumberDecompositionResponse,
    requestSerialize: serialize_calculator_PrimeNumberDecompositionRequest,
    requestDeserialize: deserialize_calculator_PrimeNumberDecompositionRequest,
    responseSerialize: serialize_calculator_PrimeNumberDecompositionResponse,
    responseDeserialize: deserialize_calculator_PrimeNumberDecompositionResponse,
  },
  squareRoot: {
    path: '/calculator.CalculatorService/SquareRoot',
    requestStream: false,
    responseStream: false,
    requestType: proto_cal_pb.SquareRootRequest,
    responseType: proto_cal_pb.SquareRootResponse,
    requestSerialize: serialize_calculator_SquareRootRequest,
    requestDeserialize: deserialize_calculator_SquareRootRequest,
    responseSerialize: serialize_calculator_SquareRootResponse,
    responseDeserialize: deserialize_calculator_SquareRootResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
