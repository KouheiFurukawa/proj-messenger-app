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

    static getFriend(id: string) {
        return fetch(`/server/get_friend/${id}`)
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

    static login(params: { id: string; password: string }) {
        return fetch('/server/login/', {
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

    static signup(params: { id: string; password: string; displayName: string }) {
        return fetch('/server/signup/', {
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

    static getLoginInfo() {
        return fetch('/server/login_info/')
            .then((response) => response.json())
            .then((data) => {
                return { result: data };
            })
            .catch((error) => {
                return { error };
            });
    }

    static logout() {
        return fetch('/server/logout/')
            .then((data) => {
                return { result: data };
            })
            .catch((error) => {
                return { error };
            });
    }

    static searchUser(id: string) {
        return fetch(`/server/search_user/${id}`)
            .then((response) => response.json())
            .then((data) => {
                return { result: data };
            })
            .catch((error) => {
                return { error };
            });
    }

    static registerFriend(params: {
        user_id: string;
        friend_id: string;
        user_icon_url: string;
        friend_icon_url: string;
    }) {
        return fetch('/server/register_friend/', {
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

    static uploadImage(params: { file: File; id: string }) {
        const uploadImage = new FormData();
        uploadImage.append('file', params.file);
        return fetch('/server/upload_image/', {
            method: 'POST',
            body: uploadImage,
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
