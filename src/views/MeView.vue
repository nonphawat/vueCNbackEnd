<template>
  <div class="text-center">
    <br />

    <h1 class="mb-2">My Profile</h1>
    <v-row class="mb-2">
      <v-col></v-col>
      <v-col>
        <v-layout wrap justify-center class="text-center">
          <v-flex xs6>
            <v-card width="350">
              <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/272px-Cat_August_2010-4.jpg"
              ></v-img>
              <!-- <v-card-title primary-title>
            <span>Cat</span>
          </v-card-title> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <div class="pa-3 float-right">Name:</div>
      </v-col>
      <v-col>
        <v-text-field solo value="Nonphawat Srinual" readonly></v-text-field>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <div class="pa-3 float-right">Nick name:</div>
      </v-col>
      <v-col>
        <v-text-field solo value="Ea้rn" readonly></v-text-field>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <div class="pa-3 float-right">University:</div>
      </v-col>
      <v-col>
        <v-text-field solo value="Maejo University" readonly></v-text-field>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <div class="pa-3 float-right">Facalty/ branch:</div>
      </v-col>
      <v-col>
        <v-text-field solo value="Computer Science" readonly></v-text-field>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <div class="pa-3 float-right">Other things</div>
      </v-col>
      <v-col>
        <v-textarea
          readonly
          filled
          value="Hobby: Traveling 
Like: Money
็Hate: Being Poor
Pros: Eager person
Cons: Lazy sometime"
        ></v-textarea>
      </v-col>
      <v-col></v-col>
    </v-row>

    <!-- <pokemonCard /> -->
  </div>
</template>
  
<script>
//import pokemonCard from "../components/CardIMG.vue";

export default {
  components: {
    //pokemonCard,
  },
  methods: {},
  data: () => ({
    alignments: ["start", "center", "end"],
  }),
};
</script>