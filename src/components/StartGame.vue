<template>
  <div>
    {{getPlayerDeck}}

    {{getCPUDeck}}
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
import { mapGetters } from "vuex";

const gitHubService = new GitHubService();

export default {
  components: {
    UserCard
  },

  computed: {
    ...mapGetters(["getPlayerDeck", "getCPUDeck"])
  },

  mounted() {
    gitHubService
      .allUsers()
      .then(response => response.data)
      .then(users => users.map(user => user.login))
      .then(logins => {});
  }
};
</script>
