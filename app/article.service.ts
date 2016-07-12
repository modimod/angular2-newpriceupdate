import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ArticleChanged} from "./article-changed";
import {Type} from "./type";

@Injectable()
export class ArticleService {

    constructor (private http: Http) {}

    //private baseUrl = 'http://localhost:8000/';
    private baseUrl = 'server.php/';
    private articlesUrl = this.baseUrl + 'articles/';
    private articlesByMandUrl = this.baseUrl + 'articlesByMand/';
    private typesUrl = this.baseUrl + 'types/';

    getArticles(): Observable<ArticleChanged[]> {
        return this.http.get(this.articlesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getArticlesByMand(mand_id: number): Observable<ArticleChanged[]> {
        return this.http.get(this.articlesByMandUrl + mand_id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTypes(): Observable<Type[]> {
        return this.http.get(this.typesUrl)
            .map(this.extractGroupData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = <ArticleChanged[]>res.json();
        
        return body || { };
    }
    private extractGroupData(res: Response) {
        let body = <Type[]>res.json();

        return body || { };
    }
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return Observable.throw(errMsg);
    }
}
