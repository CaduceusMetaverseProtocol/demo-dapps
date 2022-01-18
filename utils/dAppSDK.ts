import BigNumber from 'bignumber.js';
import DAppSDKContract from './dAppSDKContract';
import { Constants } from './constants';

const DAppsSDK = {
    // Detect connection status
    CheckStatus: async (callback: Function) => {
        let checkInfo = await DAppSDKContract.checkStatus()
        callback(checkInfo)
    },
    // Get Balance
    GetBalance: async (callback: Function) => {
        const TokenContract = DAppSDKContract.getContracts(Constants.TokenAddress, Constants.TokenAbi);
        let balance = await DAppSDKContract.getBalance(TokenContract)
        
        if(balance.hasOwnProperty('_hex')){
            balance = new BigNumber(balance.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()
        }
        callback(balance)
    },
    //Send
    HandleTransfer:async (callback: Function,address: string,amount:number) => {
        const TokenContract = DAppSDKContract.getContracts(Constants.TokenAddress, Constants.TokenAbi);
        let res = await DAppSDKContract.transfer(TokenContract,address,amount)
        callback(res)
    }
}

export default DAppsSDK