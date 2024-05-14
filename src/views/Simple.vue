<template>
  <div>
    <h1>Simple</h1>
    <h3 v-if="show">{{ name }}</h3>
    <v-btn color="success" @click="show = !show">Test</v-btn>
    <v-btn color="success" @click="callAlert('Pokemon')">Alert</v-btn>

    <v-layout row wrap justify-center class="text-center">
      <v-flex xs6>
        <v-row>
          <v-col> </v-col>

          <v-col>
            <v-card width="350">
              <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/272px-Cat_August_2010-4.jpg"
              ></v-img>
              <v-card-title primary-title>
                <span>Cat</span>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col> </v-col>
        </v-row>
        <!-- <p v-for="(user, i) in listUser" :key="i">
      ID : {{ user.id }} <br />
      User Name : {{ user.username }}
    </p> -->

        <v-text-field
          v-model="score"
          type="number"
          label="Score"
          
        ></v-text-field>
        <v-btn color="info" @click="inputScore(score)">input</v-btn>
        <br /><br />
        <h3>Your Grade is {{ grade }}</h3>
      </v-flex>
    </v-layout>

    <simcom :sendData="testProp" @message-sent="testThis" />
  </div>
</template>

<script>
import simcom from '../components/SimpleComponent.vue'
export default {
  components:{
    simcom
  },
  data() {
    return {
      name: "Pokemon",
      show: false,
      catList: [
        {
          catName: "rer",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/272px-Cat_August_2010-4.jpg",
        },
        {
          catName: "ter",
          img: "https://img.pokemondb.net/artwork/avif/pikachu.avif",
        },
      ],

      listUser: [
        { id: 1, username: "Poke" },
        { id: 2, username: "Oppo" },
        { id: 3, username: "Zet" },
      ],

      score: null,
      grade: "",
      testProp: "Test Pokemon"
    };
  },

  methods: {
    callAlert(item) {
      alert(item);
    },
    testThis(i){
      alert(i)
    },

    inputScore(i) {
      let num = Number(i);
      //   num = parseFloat(num);
      if (num >= 80) this.grade = "A";
      else if (num >= 70) this.grade = "B";
      else if (num >= 60) this.grade = "C";
      else if (num >= 50) this.grade = "D";
      else this.grade = "F";
    },
  },
};
</script>

<style>
</style>