import axios from 'axios';
import queryString from 'query-string'

const getQueryString = (): string => {
    const params = {
        client_id: '7527375cd264c8530f30',
        client_secret: '8675345800219782348c21267e31d18b15c5aea3'
    };

    return '?' + queryString.stringify(params);
}

const url: string = 'https://api.github.com/';

class GitHubService {

    getUser(username: string) {
        return axios.get(`${url}users/${username}${getQueryString()}`)
    }

    allUsers() {
        return axios.get(`${url}users${getQueryString()}`)
    }
}

export default GitHubService
