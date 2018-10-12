export class Session {
    token: string;
    id: string;
    name: string;
    email: string;

    constructor(token: string, id: string, name: string, email: string) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }

    updateToken(newToken: string) {
        this.token = newToken;
    }
}
