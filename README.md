1) Run npm install.

[Run Ganache-cli]

1) Install ganache-cli
2) Execute ganache-cli --allowUnlimitedContractSize  --gasLimit 0xFFFFFFFFFFFF --defaultBalanceEther 100000 [ Where 100,000 ether will be supplied to 10 default accounts]

[Run truffle test]

1) Go to the test folder of the Truffle directory
2) Run the truffle test with showing event
   For eg: truffle test test/presale/distribute1.test.js --show-events