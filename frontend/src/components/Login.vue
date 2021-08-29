<template>
    <div>
        <v-card class="mx-auto my-15 pa-10" max-width="500" elevation = 5>
            <v-card-title class="text-uppercase primary--text">
                Login
            </v-card-title>
            <v-card-text>
                <div v-if="error" class="error">{{error.message}}</div>
                <v-form  class="px-3">
                    <v-text-field label = "Email" v-model="email" prepend-icon="email"></v-text-field>
                    <v-text-field 
                        label = "Password" 
                        v-model="password" 
                        prepend-icon="lock"
                        :type="show ?'text': 
                        'password'"
                        :append-icon="show ?'mdi-eye':'mdi-eye-off'"   
                        @click:append="show=!show"></v-text-field>
                    <v-btn color = "accent" class = "mt-3" elevation="2" @click="pressed">Login</v-btn>
                    <div class="mt-5">Need an account? Register <router-link to="/register">here</router-link></div>
                </v-form>
            </v-card-text>
        </v-card>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            >
                Incorrect email or password.
            </v-snackbar>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
    export default {
        data(){
            return{
                email: '',
                password: '',
                error: '',
                show: false,
                snackbar: false,
                timeout: 2000
            }
        },
        methods: {
            async pressed(){
                try{
                    const val = await firebase.default.auth().signInWithEmailAndPassword(this.email, this.password)
                    console.log(val)
                    this.$router.replace({name: "Dashboard"});
                }catch(err){
                    console.log(err);
                    this.snackbar = true;
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.error {
    color: red;
    font-size: 18px;
}

</style>