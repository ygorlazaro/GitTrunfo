import axios from 'axios';

class GitHubService {
  url = `https://api.github.com/`;

  getUser(username) {
    return axios.get(`${this.url}users/${username}`)
  }

  allUsers() {
    return axios.get(`${this.url}users`)
  }
}

export default GitHubService
