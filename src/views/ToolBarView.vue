<template>
  <div>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-btn v-show="hem" icon @click="drawer = !drawer" :disabled="false">
          <span class="material-icons"> list </span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-switch v-model="$vuetify.theme.dark" class="position"></v-switch>
    </v-app-bar>

   

    <v-main>
      <v-navigation-drawer v-model="drawer" app temporary dark>
        <v-sheet dark color="lighten-4" class="pa-4">
          <h4 class="mb-4">{{ this.$store.state.userName }}</h4>

          <div>
            {{ this.$store.state.email }} <br />
            <v-btn
              v-show="adminBtn"
              color="dark"
              elevation="5"
              outlined
              to="/admin"
              >Admin</v-btn
            >
          </div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view/>
    </v-main>
  </div>
</template>

<script>

export default {

  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    dis: true,
    adminBtn: false,
    hem: true,

    items: [
      { title: "Profile", path: "/me" },
      { title: "Simple", path: "/simple" },
      { title: "Products", path: "/apicon" },
    ],
  }),
  methods: {
    show_btn(i) {
      this.adminBtn = i;
    },
    change_hem(i) {
      this.hem = i;
    },
  },
 

}
</script>

<style>

</style>