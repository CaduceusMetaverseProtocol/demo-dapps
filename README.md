# demo-dapps
This is a DApp demo in the CMPChain

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## MetaMask config
```
Network Name:  CMP Testnet
New RPC URL: https://galaxy.block.caduceus.foundation
ChainID: 512512
Symbol: CMP
Block Explorer URL: https://galaxy.scan.caduceus.foundation
```

## SDK application
```
import DAppsSDK from "../utils/dAppSDK";

<!-- Get Balance -->
DAppsSDK.GetBalance((res)=>{})
```

### Page operation instructions
```
Address: Enter transfer address
Amount: Enter transfer amount

Send Button: Click to confirm the transfer
```
