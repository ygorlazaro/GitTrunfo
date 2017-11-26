<template>
  <div class="card">
    <div class="card-content" v-if="profile.login">
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
            <button class="button is-primary is-small" v-if="profile.bio" @click="showBio=!showBio">
              {{showBio?"Hide bio":"See bio"}}
            </button>

            <span class="tag is-danger" v-else>
              There's no bio
            </span>
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
          <li>
            Repositories:
            <span class="tag is-info" @click="selectedItem('public_repos')">{{profile.public_repos}}</span>
          </li>

          <li>
            Gists:
            <span class="tag is-info" @click="selectedItem('public_gists')">{{profile.public_gists}}</span>
          </li>

          <li>
            Followers:
            <span class="tag is-info" @click="selectedItem('followers')">{{profile.followers}}</span>
          </li>

          <li>
            Following:
            <span class="tag is-info" @click="selectedItem('following')">{{profile.following}}</span>
          </li>

          <li>
            User since:
            <span class="tag is-info" @click="selectedItem('created_at')">{{profile.created_at}}</span>
          </li>

          <li>
            Last updated:
            <span class="tag is-info" @click="selectedItem('updated_at')">{{profile.updated_at}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="card-content" v-else>
      Card's back
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

  methods: {
    selectedItem(prop) {
      this.$emit("onSelectedItem", { prop });
    }
  },

  watch: {
    login() {
      if (this.login) {
        gitHubService
          .getUser(this.login)
          .then(response => (this.profile = response.data));
      }
    }
  }
};
</script>
