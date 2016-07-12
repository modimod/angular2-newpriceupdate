import { Component, ViewContainerRef }       from '@angular/core';


import { ArticleService } from './article.service';
import { HTTP_PROVIDERS } from '@angular/http';

import { ArticleListComponent } from './article-list.component';

import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <my-article-list></my-article-list>
  `,
    directives: [ArticleListComponent],
    providers: [
        HTTP_PROVIDERS, ArticleService
    ],
    viewProviders: [...BS_MODAL_PROVIDERS],
})
export class AppComponent {
    title = 'Happyfoto Price Update';
}
