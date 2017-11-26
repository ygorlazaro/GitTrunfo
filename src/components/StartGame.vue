<template>
  <div>
    {{playerDeck}}

    {{cpuDeck}}
    <div class="columns">
      <div class="column is-4">
        <UserCard login="ygorlazaro"></UserCard>
      </div>

      <div class="column is-4">
        <UserCard login="linus"></UserCard>
      </div>
    </div>

  </div>
</template>

<script>
import UserCard from "./UserCard";
import GitHubService from "@/services/github";
import ArraysService from "@/services/arrays";

const gitHubService = new GitHubService();

export default {
  components: {
    UserCard
  },

  data() {
    return {
      playerDeck: [],
      cpuDeck: []
    };
  },

  mounted() {
    gitHubService
      .allUsers()
      .then(response => response.data)
      .then(users => users.map(user => user.login))
      .then(logins => {
        const shuffledLogins = ArraysService.shuffle(logins);

        const midCards = Math.ceil(shuffledLogins.length / 2);

        this.playerDeck = shuffledLogins.splice(0, midCards);
        this.cpuDeck = shuffledLogins.splice(0, midCards);
      });
  }
};
</script>
