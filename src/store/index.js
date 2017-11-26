import Vue from 'vue';
import Vuex from 'vuex';
import ArraysService from "@/services/arrays";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playerDeck: [],
    cpuDeck: []
  },

  mutations: {
    creatingDecks(store, loginList) {
      const shuffledLogins = ArraysService.shuffle(logins);

      const midCards = Math.ceil(shuffledLogins.length / 2);

      store.playerDeck = shuffledLogins.splice(0, midCards);
      store.cpuDeck = shuffledLogins.splice(0, midCards);
    }
  },

  getters: {
    getPlayerDeck(store) {
      return store.playerDeck;
    },

    getCPUDeck(store) {
      return store.cpuDeck;
    }
  }
});

export default store;
