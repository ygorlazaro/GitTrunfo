<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <UserCard :login="playerCard.login" :deckLength="getPlayerDeck.length" @onSelectedItem="onSelectedUserItem"></UserCard>
      </div>

      <div class="column is-4">
        <UserCard :login="cpuCard.login" :deckLength="getCPUDeck.length" ref="cpuCard"></UserCard>
      </div>
    </div>

  </div>
</template>

<script>
import UserCard from "./UserCard";
import GitHubService from "@/services/github";
import { mapGetters } from "vuex";

const gitHubService = new GitHubService();

export default {
  components: {
    UserCard
  },

  computed: {
    ...mapGetters(["getPlayerDeck", "getCPUDeck"])
  },

  data() {
    return {
      playerCard: "",
      cpuCard: ""
    };
  },

  methods: {
    onSelectedUserItem(info) {
      const playerProfile = info.profile;
      const cpuProfile = this.$refs.cpuCard.profile;

      const playerValue = info.profile[info.prop];
      const cpuValue = cpuProfile[info.prop];

      let position = 0;

      if (info.prop.indexOf("_at") >= 0) {
        const playerDate = +new Date(playerValue);
        const cpuDate = +new Date(cpuValue);

        position = playerDate - cpuDate;
      } else {
        position = playerValue - cpuValue;
      }

      if (position !== 0) {
        const infoEvent = {
          player: playerProfile,
          cpu: cpuProfile,
          position
        };

        this.$store.commit("savingPlayingEvent", infoEvent);
      }

      this.$store.commit("suffleDecks");
      this.showCards();
    },

    showCards() {
      const playerDeck = this.getPlayerDeck;
      const cpuDeck = this.getCPUDeck;

      if (cpuDeck.length === 0) {
        alert("Você venceu");
      } else if (playerDeck.length === 0) {
        alert("Vocẽ perdeu");
      } else {
        this.playerCard = playerDeck[0];
        this.cpuCard = cpuDeck[0];
      }
    }
  },

  mounted() {
    gitHubService
      .allUsers()
      .then(response => response.data)
      .then(users => this.$store.commit("creatingDecks", users))
      .then(this.showCards);
  }
};
</script>
