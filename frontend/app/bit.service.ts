import {Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

import {Script} from './script'

@Injectable()
export class BitService {
    private _apiUrl: string;
    constructor(private _http: Http) {
        this._apiUrl = 'data';
    }
    getBit(language: string, slug: string) {
        return this._http.get(this._apiUrl + '/' + language + '.json')
            .map(res => <Script> res.json()[slug])
            .catch(this._handleError);
    }
    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}