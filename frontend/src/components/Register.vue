<template>
    <div>
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            Register
            <div class="email">
                <input type = "email" v-model="email" placeholder="email">
            </div>
            <div class="password">
                <input type = "password" v-model="password" placeholder="password">
            </div>
            <div class="name">
                <input v-model="name" placeholder="Name">
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
//import "firebase/auth";
    export default {
        data() {
            return {
                email: "",
                password: "",
                name: "",
                error: ""
            }
        },
        methods: {
            async pressed(){
                firebase.
                    default.auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(data => {
                    data.user
                        .updateProfile({
                        displayName: this.name
                        })
                        .then(() => {this.$router.replace({name: "registerDetails"});   });
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