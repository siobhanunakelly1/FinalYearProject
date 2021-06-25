<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-title class="text-uppercase grey--text">
                <span>Transporter</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn depressed color="white" class="text-uppercase grey--text" @click="signOut">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
    </nav>
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

