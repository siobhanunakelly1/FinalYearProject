<template>
    <div>
        <v-card class="mx-auto my-15 pa-10" max-width="500" elevation = 5>
            <v-card-title class="text-uppercase grey--text">
                Register
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
                    Register as:
                    <v-chip-group v-model = "selection" mandatory>
                        <v-chip>Admin</v-chip>
                        <v-chip>Customer</v-chip>
                    </v-chip-group>
                    <v-btn class = "mt-3" elevation="2" @click="pressed">Register</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
    data() {
        return {
            email: "",
            password: "",
            selection: "",
            error: "",
            show: false
        }
    },
    methods: {
        async pressed(){
            firebase.
                default.auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        if(this.selection === 0){
                            this.$router.replace({name: "Dashboard"})
                        }else{
                            this.$router.replace({name: "registerDetails"})
                        } 
                })
                .catch(err => {
                this.error = err.message;
                });
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