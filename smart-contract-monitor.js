require("dotenv").config();

const {Network, Alchemy} = require('alchemy-sdk');
const {ethers} = require("ethers");
const Web3 = require("web3");

const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI, 
  };
  
  const alchemy = new Alchemy(settings);

async function getLogs(abiFilename){

    const tokenContractABI = require("../ownytoken-abi.json");
    const contractAddress = tokenContractABI.address;

    const filter = {
        address: contractAddress,
        topics: [],
      };

      alchemy.ws.on(filter, (log, event)=>{

        const logData = log.data;
        const topicData = log.topics;
        const transactionAmount = Web3.utils.hexToNumberString('0x'+logData.substring(2, 66));
        const numTokens = Web3.utils.fromWei(transactionAmount.toString(), 'ether');
      
        const fromAddress = '0x'+topicData[2].substring(26,);
        const recipientAddress = '0x'+topicData[2].substring(26,);
      
        const transactionHash = log.transactionHash;
      
        alchemy.core.getTransaction(transactionHash).then(
          (result) => {
            const txnNonce = result.nonce;
            const txnEvent = result.event;
          }
        ).catch(err => {console.log(err)})
      
        const recipientSecretAddress = Web3.utils.hexToUtf8('0x'+logData.substring(194, 284));
      
      }
      ); 
}

