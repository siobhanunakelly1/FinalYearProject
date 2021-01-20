<template>
    <div>
        <template v-if="user.loggedIn">
            <div class="nav-item">{{user.data.displayName}}</div>
            <a class="nav-link" @click.prevent="signOut">Sign out</a>
          </template>
          <template v-else>
            <router-link to="login" class="nav-link">Login</router-link>
            <router-link to="register" class="nav-link">Register</router-link>
          </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    }
  }
};
</script>