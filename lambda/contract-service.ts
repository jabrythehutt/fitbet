import {APIGatewayProxyHandler, Handler} from 'aws-lambda';
import {ContractRequest} from './contract.request';

// Can't use web3 until contract is deployed to test network
// const web3 = require('web3');
// const fitbitChallengesArtifacts = require('../../build/contracts/FitbitChallenges.json');

export const handler: APIGatewayProxyHandler = async (event) => {

  if (event.body) {
    const contractRequest = JSON.parse(event.body) as ContractRequest;
  }

  const endDate = new Date(new Date().getTime() + (60 * 1000));
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      targetSteps: 20,
      endDate
    })
  };

};
