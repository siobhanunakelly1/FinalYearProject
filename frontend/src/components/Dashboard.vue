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
//import web3 from '../web3'
import deploy from '../deploy'


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
            deploy('0x10863742Fd543f441325588c35f81517ef08A7f9', '0xd86Fdd7BC008dA187c9e52934f975ABbc9d492fd');
            

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

