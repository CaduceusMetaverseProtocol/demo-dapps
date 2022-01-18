<template>
  <div id="app">
    <header>
      <h2>MTK Balance:{{balance}}</h2>
    </header>
    <main>
      <div>
        <span>Address:</span>
        <input type="text" v-model="address"/>
      </div>
      <div>
        <span>Amount:</span>
        <input type="text"  v-model="amount"/>
      </div>
      <button @click="Transfer">Send</button>
    </main>
  </div>
</template>

<script>
import DAppsSDK from "../utils/dAppSDK";
export default {
  name: "App",
  data(){
    return{
      balance:'',
      address:'',
      amount:'',
    }
  },
  created() {
    this.CheckStatus();
    this.GetBalance();
  },
  methods:{
    CheckStatus(){
      DAppsSDK.CheckStatus((result) => {});
    },
    GetBalance(){
      DAppsSDK.GetBalance((result) => {
        if(typeof(result) == 'number'){
          this.balance = result; 
        }
      });
    },
    Transfer(){
      DAppsSDK.HandleTransfer((result) => {console.log('res',result)},this.address,this.amount)
    },
  }
};
</script>

<style scoped>
main div{
  width: 390px;
  height: 70px;
  margin: 0 auto;
  display: flex;
}
main div span {
  width: 90px;
  text-align: right;
  margin-top: 20px;
  line-height:35px;
  display: inline-block;
}
span {
  margin-right: 5px;
}
input {
  width: 290px;
  height: 40px;
  outline: none;
  border-radius: 11px;
  margin-top: 15px;
  padding-left: 10px;
  border: 1px #003cff73 solid;
}
button {
  width: 95px;
  height: 50px;
  cursor: pointer;
  margin-top: 20px;
  border: none;
  font-size: 18px;
  color: #ffffff;
  text-align:center;
  line-height:50px;
  border-radius: 15px;
  background-color: #003cff73;
}

#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
