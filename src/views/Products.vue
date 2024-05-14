<template>
  <div class="pa-5">
    <h1>Products Database</h1>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Add New </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Product Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="postData.p_name"
                label="Product Name *"
                required
                :rules="[(v) => !!v || 'required']"
              ></v-text-field>
              <v-text-field
                type="number"
                v-model="postData.price"
                label="Product Price *"
                required
                :rules="[(v) => !!v || 'required']"
              ></v-text-field>
              <v-text-field
                type="number"
                v-model="postData.quantity"
                label="Product Quantity *"
                required
                :rules="[(v) => !!v || 'required']"
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="postData.img"
                label="Product Image *"
                required
                :rules="[(v) => !!v || 'required']"
              ></v-text-field>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clearData()"> Close </v-btn>
          <v-btn
            :disabled="!valid"
            color="blue darken-1"
            text
            @click="validate"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <br />

    <v-row>
      <v-col v-for="(product, index) in apidata" :key="index" cols="sm">
        <v-card class="mx-auto mb-5 pa-5" width="250">
          <v-img class="white--text align-end jpgs" :src="product.img"> </v-img>

          <v-card-title>{{ product.p_name }}</v-card-title>

          <v-card-text class="text--primary">
            <div>Product ID: {{ product._id }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" outlined @click="updateData(product)">
              Update
            </v-btn>

            
            <v-spacer></v-spacer>
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red" outlined v-bind="attrs" v-on="on"
                  >Delete</v-btn
                >
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-card-text>
                    <div class="text-h5 pa-12">
                      Are you sure to delete ({{ product.p_name }})!
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">No</v-btn>
                    <v-btn text @click="deleteData(product._id)">Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
           
            
          </v-card-actions>
          <dialogPop :sendData="product._id" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
  <script>

import dialogPop from '../components/Dialog.vue'

export default {
    components:{
        dialogPop
    },
  data() {
    return {
      id: "",
      apidata: [],
      dialogEdit: true,
      postData: {
        p_name: "",
        quantity: "",
        price: "",
        img: "",
      },

      postDefault: {
        p_name: "",
        quantity: "",
        price: "",
        img: "",
      },
      dialog: false,
      valid: false,
      isEdit: false,
    };
  },

  methods: {
    clearData() {
      this.postData = this.postDefault;
      this.dialog = false;
    },
    async getData() {
      await this.axios
        .get("http://localhost:3000/products/api/v1/products")
        .then((res) => {
          //console.log(res.data);
          this.apidata = res.data;
        });
    },
    async validate() {
      this.$refs.form.validate();
      try {
        if (this.isEdit === false) {
          const { data } = await this.axios.post(
            "http://localhost:3000/products/api/v1/products/",
            this.postData
          );
          this.postData = this.postDefault;

          console.log(data);
          alert(data.message);
        } else {
          const { data } = await this.axios.put(
            "http://localhost:3000/products/api/v1/products/" + this.id,
            this.postData
          );
          this.isEdit = false;
          this.postData = this.postDefault;
          console.log(data);
        }

        this.dialog = false;
        this.getData();
      } catch (err) {
        console.log(err.message);
      }
    },

    async updateData(i) {
      try {
        this.dialog = true;
        this.isEdit = true;
        this.id = i._id;
        this.postData = {
          p_name: i.p_name,
          price: i.price,
          quantity: i.quantity,
          img: i.img,
        };
        console.log(this.postData.p_name);
      } catch (err) {
        console.log(err.message);
      }
    },

    async deleteData(id) {
      try {
        const { data } = await this.axios.delete(
          "http://localhost:3000/products/api/v1/products/" + id
        );
        console.log(data);
        this.dialog = false;
        await this.getData();
      } catch (err) {
        console.log(err.message);
      }
    },
    async ordersData(id) {
      try {
        const { data } = await this.axios.get(
          "http://localhost:3000/products/api/v1/products/" + id + "/orders"
        );
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    },
  },

  mounted() {
    this.getData();
  },

  computed: {
    saveMode() {
      return this.id == "" ? "NewItem" : "Edit Item";
    },
  },
};
</script>
  
  <style>
</style>