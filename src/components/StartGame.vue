<template>
  <div>
    {{users}}

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

const gitHubService = new GitHubService();

export default {
  components: {
    UserCard
  },

  data() {
    return {
      logins: []
    };
  },

  mounted() {
    gitHubService
      .allUsers()
      .then(response => response.data)
      .then(users => users.map(user => user.login))
      .then(logins => (this.logins = logins));
  }
};
</script>
