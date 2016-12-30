import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

const data = {
    token: 'ThisIsYourSecretToken'
};

@Injectable()
export class AuthService {
    constructor() { }

    loginUser(): Observable<string> {
        return Observable.of(data).map(res => JSON.stringify(res));
    }
}