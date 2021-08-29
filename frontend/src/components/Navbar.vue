<template>
    <nav>
        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer" class="primary--text"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase primary--text">
                <span>Transporter</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if = "loggedIn">
            <v-btn text color="primary" @click="signOut">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
            </div>
        </v-app-bar>
        <v-navigation-drawer app color = accent v-model="drawer">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-action>
                    <v-icon class = "white--text">{{ link.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class = "white--text">{{ link.text }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import firebase from "firebase"
    export default {
        data() {
            return {
                loggedIn: false,
                user: null,
                name: "",
                drawer: false,
                 links: [
                    { icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
                    { icon: 'map', text: 'Map', route: '/map' },
                ]
                }
            
        },
        created(){
        firebase.default.auth().onAuthStateChanged(user => {
          if (user) {
                this.loggedIn = true
                console.log(user.email);
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

