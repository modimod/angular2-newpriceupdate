/**
 * Created by pmoertenboeck on 29.06.16.
 */
/*
import { Article } from './article';
import { ArticleChanged } from './article-changed';
import { Injectable } from '@angular/core';
import { ARTICLES } from './mock-articles';

import { Mandant } from './mandant';


import {Observable} from "rxjs/Rx";

@Injectable()
export class ArticleService {
    getArticles(): Observable<ArticleChanged[]> {
        return Observable.of((<ArticleChanged[]>ARTICLES).map(a => {
            a.new_available = a.available;
            return a;
        }));
        //return Promise.resolve(ARTICLES);
    }
    getArticlesSlowly() {
        return new Promise<Article[]>(resolve =>
            setTimeout(() => resolve(ARTICLES), 1) // 2 seconds
        );
    }

    getArticlesByMandant(mandant: Mandant) {
        return new Promise<Article[]>(resolve =>
            setTimeout(() => resolve(ARTICLES.filter(article => article.mand_id === mandant.artt_id)), 1)
        );
    }
    
}
*/
