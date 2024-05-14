<template>
    <div class="pa-10">
      <v-layout justify-center>
        <v-flex xs6>
          <v-card class="pa-10">
            <h1 class="text-center">Register</h1>
            <br />
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                label="Name"
                required
                :rules="[(v) => !!v || 'Username is required']"
              ></v-text-field>
              <v-text-field
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                v-model="password"
                label="Password"
                class="input-group--focused"
                :rules="[(v) => !!v || 'Password is required']"
                @click:append="show2 = !show2"
                required
              ></v-text-field>
  
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                :rules="[(v) => !!v || 'Item is required']"
              >
                Validate
              </v-btn>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </template>
  
  <script>
  export default {
    name: "Register",
  
    data: () => ({
      valid: false,
      username: "",
      show2: false,
      password: "",
    }),
    methods: {
      validate() {
        this.$refs.form.validate();
        console.log(this.username, " and ", this.password);
      },
    },
  };
  </script>
  