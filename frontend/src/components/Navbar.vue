<template>
    <div>
        <div v-if="user" class="alert alert-success" role="alert">Logged in </div>
        <span v-else>Not logged in</span>
        <div>
            <button @click="signOut">Sign Out</button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase"
//import { mapGetters } from "vuex";
    export default {
        /*computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        },*/
        data() {
            return {
                user: null
                }
            
        },
        created(){
        firebase.default.auth().onAuthStateChanged(user => {
          if (user) {
                this.user = user
             } else {
                console.log('No user2')
                this.user = null
                }
              });

        },
        methods: {
            async signOut(){
                try{
                    const data = firebase.default.auth().signOut();
                    console.log(data);
                    this.$router.replace({name: "login"})
                }catch(err){
                    console.log(err)
                }
                
            }
        }
    };
</script>

