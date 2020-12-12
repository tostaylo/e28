<template>
  <div class="route-main">
    <h1>Account</h1>
    <div class="form-container">
      <form v-if="!user">
        <div>
          <input type="radio" id="login" value="Login" v-model="status" />
          <label for="login">Login</label>
          <br />
          <input type="radio" id="register" value="Register" v-model="status" />
          <label for="register">Register</label>
          <br />
        </div>
        <label v-if="status !== 'Login'">Name </label
        ><input v-if="status !== 'Login'" v-model="name" type="text" />
        <label>Email </label><input v-model="email" type="text" />
        <label>Password</label><input v-model="password" type="text" />
        <button @click="authenticate">GO</button>
      </form>
      <button v-else @click="logout">Logout</button>
    </div>
  </div>
</template>



<script lang="ts">
import { User } from "@/types";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      name: "",
      status: "Login",
      errors: null,
    };
  },

  methods: {
    authenticate(e: { preventDefault: () => void }) {
      e.preventDefault();
      const url = this.status === "Login" ? "login" : "register";
      fetch(`${process.env.VUE_APP_API_URL}${url}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          name: this.status !== "Login" ? this.name : null,
        }),
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            this.$store.commit("setUser", data.user);
          } else {
            this.errors = data.errors;
          }
        }
      });
    },

    logout() {
      if (!this.$store.state.user) {
        return;
      }
      fetch(`${process.env.VUE_APP_API_URL}logout`, {
        method: "POST",
        credentials: "include",
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            this.$store.commit("setUser", null);
          } else {
            this.errors = data.errors;
          }
        }
      });
    },
  },
  computed: {
    user(): User {
      return this.$store.state.user;
    },
  },
});
</script>



<style scoped>
.form-container {
  width: 400px;
  margin: 0 auto;
}
form {
  display: flex;
  flex-direction: column;
  width: 320px;
}
</style>
