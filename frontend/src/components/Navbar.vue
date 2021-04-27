<template>
    <div>
        <div v-if="loggedIn"> {{ name }} Logged in </div>
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
                loggedIn: false,
                user: null,
                name: ""
                }
            
        },
        created(){
        firebase.default.auth().onAuthStateChanged(user => {
          if (user) {
                this.loggedIn = true
                this.name = user.displayName;
                console.log(this.name);
             } else {
                this.loggedIn = false
                }
              });

        },
        methods: {
            async signOut(){
                try{
                    const data = await firebase.default.auth().signOut();
                    console.log(data);
                    this.$router.replace({name: "login"})
                }catch(err){
                    console.log(err)
                }
                
            }
        }
    };
</script>

