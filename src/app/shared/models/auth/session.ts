export class Session {
    token: string;
    email: string;

    constructor(token: string, email: string) {
        this.token = token;
        this.email = email;
    }

}
