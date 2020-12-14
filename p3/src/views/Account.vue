<template>
  <div class="route-main">
    <h1>Account</h1>
    <h2 v-if="user">{{ user.name }}</h2>
    <div class="form-container">
      <strong v-for="error in errors" :key="error">{{ error }}</strong>
      <form v-if="!user">
        <div class="radio-container">
          <input type="radio" id="login" value="Login" v-model="status" />
          <label for="login">Login</label>
          <br />
          <input type="radio" id="register" value="Register" v-model="status" />
          <label for="register">Register</label>
          <br />
        </div>
        <label v-if="status !== 'Login'">Name </label
        ><input
          autocomplete="name"
          v-if="status !== 'Login'"
          v-model="name"
          type="text"
          required
        />
        <label>Email </label
        ><input autocomplete="email" v-model="email" type="text" required />
        <label>Password</label
        ><input
          :autocomplete="
            status !== 'Login' ? 'new-password' : 'current-password'
          "
          v-model="password"
          type="password"
          required
        />
        <button type="submit" @click="authenticate">{{ status }}</button>
      </form>
      <button v-else @click="logout">Logout</button>
    </div>
  </div>
</template>



<script lang="ts">
import { User } from "@/types";
import { defineComponent } from "vue";
import Validator from "validatorjs";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      name: "",
      status: "Login",
      errors: [] as string[],
    };
  },

  methods: {
    authenticate(e: { preventDefault: () => void }) {
      e.preventDefault();

      const { passesVal, errors } = this.validate();
      if (!passesVal) {
        this.errors = errors;
        return;
      }

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
        this.name = "";
        this.email = "";
        this.password = "";
        this.errors = [];
      });
    },

    validate(): {
      passesVal: boolean | void;
      errors: string[];
    } {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      let rules = {
        // this.name should be undefined for Login but not Register.
        //Using string to let it pass validation for empty strings
        name: this.status === "Login" ? "string" : "required",
        email: "required|email",
        password: "required|min:8",
      };
      let validation = new Validator(data, rules);

      return {
        passesVal: validation.passes(),
        errors: [
          ...validation.errors.get("email"),
          ...validation.errors.get("password"),
          ...validation.errors.get("name"),
        ],
      };
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

  watch: {
    status() {
      this.email = "";
      this.password = "";
      this.name = "";
      this.errors = [];
    },
  },
});
</script>



<style scoped>
.form-container {
  width: 320px;
  margin: 0 auto;
}

strong {
  display: block;
  color: red;
  margin-bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-top: 5px;
}

input[type="text"],
input[type="password"] {
  font-size: 18px;
  color: #333;
  height: 40px;
  padding: 0 10px;
  border-radius: 3px;
}

button {
  width: 50%;
  margin: 15px auto 0 auto;
}

.radio-container {
  text-align: left;
  margin-bottom: 15px;
}
</style>
