import axios from "axios";
import { LoginUserInterface } from "../shared/interfaces/LoginUserInterface";
import { UserInterface } from "../shared/interfaces/UserInterface";

const API_BASE_URL = "https://localhost:44329"; //7090

class ApiService {
    getWordDefinition(word: string): Promise<any> {
        return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response) => {
            return response.data;
        })
    }

    register(createUser: UserInterface): Promise<string> {
        return axios.post(`${API_BASE_URL}/users`, createUser).then((response) => {
            return response.data;
        })
    }

    login(loginUser: LoginUserInterface): Promise<string> {
        return axios.post(`${API_BASE_URL}/login`, loginUser).then((response) => {
            return response.data;
        })
    }

    getUserDetails(args: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/display/`, args).then((response) => {
            return response.data;
        })
    }

    editUserDetails(updateUserEntity: any): Promise<string> {
        return axios.put(`${API_BASE_URL}/edit/`, updateUserEntity).then((response) => {
            return response.data;
        })
    }

    addArticle(item: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/articles`, item).then((response) => {
            return response.data;
        })
    }
    
    getUserArticles(args: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/get-articles`, args).then((response) => {
            return response.data;
        })
    }

    deleteUserArticle(args: any): Promise<string> {
        return axios.delete(`${API_BASE_URL}/delete-article`, { data: args }).then((response) => {
            return response.data;
        })
    }

    getSentimentAnalysis(args: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/sentiment-score`, args).then((response) => {
            return response.data;
        })
    }

    getSummarizedText(args: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/summarize`, args).then((response) => {
            return response.data;
        })
    }

    getKeywords(args: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/keywords`, args).then((response) => {
            return response.data;
        })
    }

    addUserSearches(item: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/searches`, item).then((response) => {
            return response.data;
        })
    }

    getUserSearchesTrends(item: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/filter`, item).then((response) => {
            return response.data;
        })
    }

    getEvolutionForKeyphrase(item: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/get-statistics`, item).then((response) => {
            return response.data;
        })
    }

    getArticle(item: any): Promise<string> {
        return axios.post(`${API_BASE_URL}/get-article`, item).then((response) => {
            return response.data;
        })
    }

    getKeywordsForWordcloud(): Promise<string> {
        return axios.get(`${API_BASE_URL}/occurrences`).then((response) => {
            return response.data;
        })
    }
}

export default ApiService;
