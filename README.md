# Fit Bet

Bet Eth on the number of steps you intend to record with your Fitbit device

## Getting started

1. `npm install`

## Running tests

1. `ganache-cli`
2. In a new terminal: `npm run truffle-test`

## Configuration
1. In order to connect with the Ethereum network, you will need to configure MetaMask
2. Log into the `ganache-cli` test accounts in MetaMask, using the 12-word phrase printed earlier.
    1. A detailed explaination of how to do this can be found [here](http://truffleframework.com/docs/advanced/truffle-with-metamask#using-the-browser-extension)
        1. Normally, the available test accounts will change whenever you restart `ganache-cli`.
        2. In order to receive the same test accounts every time you start `ganache-cli`, start it with a seed like this: `ganache-cli --seed 0` or `ganache-cli -m "put your mnemonic phrase here needs twelve words to work with MetaMask"`
3. Point MetaMask to `ganache-cli` by connecting to the network `localhost:8545` 

