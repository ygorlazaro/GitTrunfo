<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <UserCard :login="playerCard" @onSelectedItem="onSelectedUserItem()"></UserCard>
      </div>

      <div class="column is-4">
        <UserCard :login="cpuCard"></UserCard>
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
    onSelectedUserItem(info) {},

    showCards() {
      const playerDeck = this.getPlayerDeck;
      const cpuDeck = this.getCPUDeck;

      this.playerCard = playerDeck[0];
      this.cpuCard = cpuDeck[0];
    }
  },

  mounted() {
    gitHubService
      .allUsers()
      .then(response => response.data)
      .then(users => users.map(user => user.login))
      .then(logins => this.$store.commit("creatingDecks", logins))
      .then(this.showCards);
  }
};
</script>
