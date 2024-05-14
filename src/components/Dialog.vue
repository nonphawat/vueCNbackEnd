<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" outlined v-on="on">Orders</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">{{ sendData }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ["sendData"],
  data() {
    return {
        apiData: []
    };
  },

  methods: {
    async getOrdersData() {
      try {
        const { data } = await this.axios.get(
          "http://localhost:3000/products/api/v1/products/" +
            this.sendData +
            "/orders"
        );
        this.apiData = data;
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    },
  },

  mounted(){
    this.getOrdersData();
  }
};
</script>

<style>
</style>