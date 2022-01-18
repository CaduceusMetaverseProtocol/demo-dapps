import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
let accounts: string; 
const ethereum: any = (<any>window).ethereum; 
const web3: any = (<any>window).web3; 


interface txType {
  wait?: Function
}

const DAppsSDKContract = {
  
  isMetaMaskConnected: () => accounts && accounts.length > 0,
  
  checkStatus: async () => {
    if (!web3 || !ethereum) {
      window.alert('Failed to connect wallet. Please refresh the page or exit to try again!');
      return;
    }
    if (DAppsSDKContract.isMetaMaskConnected()) {
      console.log('Connected')
      return true
    } else {
      return await DAppsSDKContract.connectReqAccount()
    }
  },
  
  connectReqAccount: async () => {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      DAppsSDKContract.handleNewAccounts(newAccounts);
      return newAccounts[0]
    } catch (error) {
      console.log(error);
      return error
    }
  },
 
  handleNewAccounts: function(newAccounts: string) {
    accounts = newAccounts;
  },

  waitFun: async (tx: txType, message: string, callbackFun?: Function) => {
    const receipt = await tx.wait!(2)
    if(receipt.status === 1) {
      if(callbackFun){
        callbackFun(receipt.transactionHash)
      }else{
        console.error(message, receipt.transactionHash)
        return {
          code: receipt.status, 
          message: message,
          tx_hash: receipt.transactionHash
        }
      }
    }
  },
  errorFun: (error: any) => {
    if(error.data){ 
      // let { data: { message, code } } = error
      console.log(error.data)
      return error.data
    }else if(error.code === 4001){ 
      return {
        code: 4001,
        message: "MetaMask Tx Signature: User denied transaction signature."
      }
    }else{
      console.error(error.message)
      return error
    }
  },
  getBigNumberPrice: (price:number, decimal:number) => {
    return new BigNumber(price).multipliedBy(new BigNumber(10).pow(decimal))
  },
  /**
   * @param address
   * @param abi 
   * @returns
   */
  getContracts: (address: string, abi: Array<object>) => {
    let ethersProvider = new ethers.providers.Web3Provider(ethereum);
    return new ethers.Contract(address, abi, ethersProvider.getSigner());
  },
  /**
   * @param contractObj 
   * @param coinId 
   * @returns balance Bignumber Obj
   */
  getBalance : async (contractObj: any) => {
    let account = await DAppsSDKContract.connectReqAccount();
    try {
      const balance = await contractObj.balanceOf(account)
      return balance
    } catch (error) {
      return DAppsSDKContract.errorFun(error)
    }
  },
  transfer : async (contractObj: any, address: string,amount: number) => {
    try {
      const newAmount = DAppsSDKContract.getBigNumberPrice(amount, 18).toString();
      const balance = await contractObj.transfer(address,newAmount)
      return balance
    } catch (error) {
      return DAppsSDKContract.errorFun(error)
    }
  }
}

export default DAppsSDKContract