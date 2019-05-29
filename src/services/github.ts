import axios from 'axios';
import queryString from 'query-string';

const getQueryString = (): string => {
    const params = {
        client_id: '7527375cd264c8530f30',
        client_secret: 'c43f520704b64c5080f4b96beeb48bb3d8d46feb'
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
