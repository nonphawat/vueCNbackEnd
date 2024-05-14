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
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
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

    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Product ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Amount</th>
            <th class="text-left"></th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in apidata" :key="i">
            <td>{{ product._id }}</td>
            <td>{{ product.p_name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
            <td>
              <v-btn color="yellow" @click="updateData(product)" outlined
                >Update</v-btn
              >
            </td>

            <td>
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
            </td>

            <td>
                <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue" @click="ordersData(product._id)" outlined v-bind="attrs" v-on="on"
                    >Order Details</v-btn
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
                      <v-btn text @click="ordersData(product._id)">Yes</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>


            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      apidata: [],
      dialogEdit: true,
      postData: {
        p_name: "",
        quantity: "",
        price: "",
      },

      postDefault: {
        p_name: "",
        quantity: "",
        price: "",
      },
      dialog: false,
      valid: false,
      isEdit: false,
    };
  },

  methods: {
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
        };
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
    async ordersData(id){
        try{
            const { data } = await this.axios.get(
                "http://localhost:3000/products/api/v1/products/"+id+"/orders"
            )
            console.log(data);

        } catch(err){
            console.log(err.message);
        }
    }
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