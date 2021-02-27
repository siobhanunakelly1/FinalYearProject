<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class ="card-head">
            <div class = "buttons">
              <button>Search</button>
              <button>Filter</button>
              <button>Sort</button>
            </div> 
            <button @click="createDelivery">Create</button>
          </div>
          <div class="card-body">          
            <div id="app">
              
              <kendo-listview :data-source="deliveries" :template="template">
              </kendo-listview>
              
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*import { mapGetters } from "vuex";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};*/

import firebase from 'firebase'
//import deploy from '../deploy'
/*const ganache = require('ganache-cli');
const Web3 = require('web3');
//connects to test network ganache, when running on different network e.g. Rinkeby, change "ganache.provider()"
const web3 = new Web3(ganache.provider());

const contractFile = require('/compile');

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;
let delivery;
let accounts;*/

    export default {
        data() {
            return {
                user: null,
                deliveries: [
                  { number: 1 , coll: "wexford", dest: "dublin"},
                  { number: 2 , coll: "louth", dest: "carlow"},
                  { number: 3 , coll: "cork", dest: "longford"}
                ],
                template: `
                <div class = "hello">
                  <div class="card1">
                    <div class="card-body">
                      <span>Number:</span> #:number#<br>
                      <span>Collection Address:</span> #:coll#<br>
                      <span>Delivery Address:</span> #:dest#<br>
                      
                    </div>
                  </div>
                </div>

                  `,

              }
            
        },
        created(){
        firebase.default.auth().onAuthStateChanged(user => {
          if (user) {
                this.user = user
             } else {
                this.user = null
                }
              });
        },
        methods: {
          async createDelivery(){
            //deploy('0xe90a1BD2f2b82b540F1975eA288AFe0b47ed1884', '0xe90a1BD2f2b82b540F1975eA288AFe0b47ed1884', '0xe90a1BD2f2b82b540F1975eA288AFe0b47ed1884')
          }
        }
    };
        
</script>

<style>
#app {
  width: 95%;
  min-width: 360px;
  margin: 0 auto;
  font-family: 'helvetica';
}

.k-listview {
 
 background: #7bd3cc;
 

}

.buttons {
  margin-left: 3%;
  margin-right: 80%;
  display: inline-block;
}


.card1 {
  background: #fff;
  font-size: 16px;
  width: 85%;
  min-width: 286px;
  margin: 2em auto;
  padding: 1.25em;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
}

.card {
  background: #fff;
  width: 85%;
  min-width: 286px;
  margin: 2em auto;
  padding: 1.25em;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
}

.card-body span {
  width: 300px;
  display: inline-block;
  font-weight: bold;
}
</style>

