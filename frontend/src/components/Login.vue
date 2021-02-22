<template>
    <div>
        Login
        <form @submit.prevent="pressed">
            <div class = "login">
                <input type = "email" placeholder="login" v-model = "email">
            </div>
            <div class="password">
                <input type = "password" v-model="password" placeholder="password">
            </div>
            <button>Log In</button>
        </form>
        <div class = "error" v-if="error">{{error.message}}</div>
        <span>Need an account? Click here to <router-link to="/register">register</router-link></span>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
    export default {
        data(){
            return{
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            async pressed(){
                try{
                    const val = await firebase.default.auth().signInWithEmailAndPassword(this.email, this.password)
                    console.log(val)
                    this.$router.replace({name: "Dashboard"});
                }catch(err){
                    console.log(err)
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