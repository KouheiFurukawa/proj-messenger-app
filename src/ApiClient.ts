export default class ApiClient {
    static getUser() {
        return fetch('/server/get_user/')
            .then((response) => response.json())
            .then((data) => {
                return { result: data };
            })
            .catch((error) => {
                return { error };
            });
    }

    static getFriend() {
        return fetch('/server/get_friend/')
            .then((response) => response.json())
            .then((data) => {
                return { result: data };
            })
            .catch((error) => {
                return { error };
            });
    }

    static getMessage(params: { user1: string; user2: string }) {
        return fetch(`/server/get_message?user1=${params.user1}&user2=${params.user2}`)
            .then((response) => response.json())
            .then((data) => {
                return { result: data };
            })
            .catch((error) => {
                return { error };
            });
    }

    static sendMessage(params: { user_from: string; user_to: string; text: string; send_date: string }) {
        return fetch('/server/send_message/', {
            method: 'POST',
            body: JSON.stringify({ ...params }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return { result: data };
            })
            .catch((error) => {
                return { error };
            });
    }
}
