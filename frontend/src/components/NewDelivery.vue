<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            New Delivery
            <div class="description">
                <input v-model="description" placeholder="Description">
            </div>
            <div>
            <dropdown :options="list" :selected="item" v-on:updateOption="methodToRunOnSelect"></dropdown>
            </div>
            <button type="create">Create</button>
        </form>
    </div>
</template>

<script>
import dropdown from 'vue-dropdowns';
import firebase from 'firebase';

export default {
        data() {
          return {
            buyerList: [],
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
              var key = childSnapshot.key;
              var data = childSnapshot.val();
              //"hi";
              // ...

              listSellers.push({ key: key, address: data.Address});
            });
            console.log(listSellers);
          });
        },

        components: {
            'dropdown': dropdown,
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