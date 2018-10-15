export class Session {
    token: string;
    email: string;
    name: string;

    constructor(token: string, email: string, name: string) {
        this.token = token;
        this.email = email;
        this.name = name;
    }

}
