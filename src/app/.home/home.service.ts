import { Injectable } from '@angular/core';

const message = 'This is a message';
@Injectable()
export class HomeService {
    constructor() { }

    getData(): string {
        return message;
    }
}