import {APIGatewayProxyHandler, Handler} from 'aws-lambda';
import {ContractRequest} from './contract.request';

// Can't use web3 until contract is deployed to test network
// const web3 = require('web3');
// const fitbitChallengesArtifacts = require('../../build/contracts/FitbitChallenges.json');

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.body) {
    const contractRequest = JSON.parse(event.body) as ContractRequest;
  }
  const timestamp = new Date().getTime();
  const startDate = new Date(timestamp);
  const endDate = new Date(timestamp + (60 * 1000));
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      targetSteps: 20,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    })
  };

};
