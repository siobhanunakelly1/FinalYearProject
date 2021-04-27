<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            New Delivery
            <div class="description">
                <input v-model="description" placeholder="Description">
            </div>
            <div>
              <b-form-select v-model="selected" :options="options"></b-form-select>
              <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
              <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
            </div>
            <button type="create">Create</button>
        </form>
    </div>
</template>

<script>
//import dropdown from 'vue-dropdowns';
import firebase from 'firebase';

export default {
        data() {
          return {
            buyerList: [],
            list: [],
            sellerList: [],
            description: '',
            error: '',
            item: {
              name: 'Object Name',
            },
            item2: {
              name: 'Object Name',
            },
          }
        },
        created(){
          var ref = firebase.database().ref("/sellers");
          ref.once('value', function(snapshot) {
          var listSellers = [];
            snapshot.forEach(function(childSnapshot) {
              //var key = childSnapshot.key;
              var data = childSnapshot.val();
              //"hi";
              // ...

              listSellers.push({ name: data.Company});
              
            });
            this.sellerList = listSellers;
            console.log(listSellers);
          });
        },

        

        methods: {
          methodToRunOnSelect(payload) {
            this.object = payload;
          }
        }
      }
</script>

<style lang="scss" scoped>
.error {
    color: red;
    font-size: 18px;
}
input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}
button {
    width: 400px;
    height: 75px;
    font-size: 100%;
}
</style>