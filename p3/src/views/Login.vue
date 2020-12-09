<template>
  <div class="route-main">
    <h1>Login</h1>
    <div class="form-container">
      <form>
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
      </form>
      <button @click="authenticate">GO</button>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>



<script lang="ts">
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
    authenticate() {
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
          if (data.success && data.authenticated) {
            this.$store.commit("setUser", data.user);
          } else {
            this.errors = data.errors;
          }
        }
      });
    },

    logout() {
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
