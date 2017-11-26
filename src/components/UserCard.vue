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
            {{formatedName}}
          </p>
          <p class="subtitle is-6">
            <a :href="'https://www.github.com/' + profile.login" target="_blank">@{{profile.login}}</a>
            <button class="button is-primary is-small" @click="showBio=!showBio">
              {{showBio?"Hide bio":"See bio"}}
            </button>
          </p>
        </div>
      </div>

      <div class="content">
        <div v-if="profile.location">
          {{profile.location}}
        </div>

        <div v-if="profile.blog">
          Link: <a :href="profile.blog" target="_blank">{{profile.blog}}</a>
        </div>

        <div class="bio" v-if="showBio">
          {{profile.bio}}
        </div>

        <ul>
          <li>Repositories: {{profile.public_repos}}</li>
          <li>Gists: {{profile.public_gists}}</li>
          <li>Followers: {{profile.followers}}</li>
          <li>Following: {{profile.following}}</li>
          <li>User since: {{profile.created_at}}</li>
          <li>Last updated: {{profile.updated_at}}</li>
        </ul>
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
      profile: {},
      showBio: false
    };
  },

  computed: {
    formatedName() {
      if (!this.profile.name) {
        return;
      }

      const names = this.profile.name.split(" ");

      if (names.length === 1) {
        return names[0];
      }

      return `${names[0]} ${names[names.length - 1]}`;
    }
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
