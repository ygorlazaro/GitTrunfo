<template>
  <div class="card" v-if="profile.login">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="profile.avatar_url" alt="Profile Picture">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">
            {{profile.name}}
          </p>
          <p class="subtitle is-6">
            <a :href="'https://www.github.com/' + profile.login" target="_blank">@{{profile.login}}</a>
          </p>
        </div>
      </div>

      <div class="content">
        {{profile.bio}}
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time :datetime="profile.created_at">
          {{profile.created_at}}
        </time>
      </div>
    </div>
  </div>
</template>

<script>
import GitHubService from "@/services/github";

const gitHubService = new GitHubService();

export default {
  props: ["login"],

  data() {
    return {
      profile: {}
    };
  },

  mounted() {
    if (this.login) {
      gitHubService
        .getUser(this.login)
        .then(response => (this.profile = response.data));
    }
  }
};
</script>
