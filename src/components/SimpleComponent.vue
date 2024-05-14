<template>
  <div>
    <h1>Simple</h1>
    <h1>{{ sendData }}</h1>
    <v-btn color="success" @click="callMain()">callMain</v-btn>
    <br /><br />

    <v-text-field
      v-model="message"
      type="text"
      label="write something.."
    ></v-text-field>
    <v-btn @click="send()">Send</v-btn>
  </div>
</template>

<script>
export default {
  props: ["sendData"],
  data() {
    return {
      message: null,
    };
  },
  methods: {
    send() {
      this.$emit("message-sent", this.message);
    },
    callMain() {
      this.$emit("call-Alert");
    },
  },
};
</script>

<style>
</style>