import {Component, OnInit, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { ArticleChanged } from './article-changed';
import { ArticleService } from './article.service';

import { Mandant } from './mandant';
import { MANDANTS } from './mock-mandants';

import { Type } from './type';

import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'my-article-list',
    templateUrl: 'app/article-list.component.html',
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css'],
    /*host: {
        '(document:keypress)': '_keypress($event)',
    },*/
})
export class ArticleListComponent implements OnInit {
    
    constructor (private articleService: ArticleService, public modal: Modal, viewContainer: ViewContainerRef, private ref: ChangeDetectorRef) {
        modal.defaultViewContainer = viewContainer;
        /*ref.detach();
        setInterval(() => {
            this.ref.detectChanges();
        }, 500);*/
    }

    showPriceUpdate: boolean = false;

    mandants: Mandant[];
    selectedMandant: Mandant;
    loadedMandants: Mandant[] = [];
    
    allArticles: ArticleChanged[] = [];
    shownArticles: ArticleChanged[] = [];
    selectedArticle: ArticleChanged;
    
    types: Type[] = [];
    selectedType: Type;
    
    showNotAvailable: boolean = false;
    showChanged: boolean = false;

    errorMessage: string;

    onMandantSelect(mandant: Mandant) {
        this.selectedMandant = mandant;
        console.log('loadedMandants', this.loadedMandants);
        if (this.loadedMandants.indexOf(mandant) == -1) {
            this.loadedMandants.push(mandant);
            this.getArticlesByMandant(mandant);
        }else {
            this.filterArticles();
        }
    }

    onTypeSelect(event) {
        this.selectedType = event;
        this.filterArticles();
    }

    onAvailableSelect(state: boolean) {
        this.showNotAvailable = state;
        this.filterArticles();
    }

    onChangedSelect(state: boolean) {
        this.showChanged = state;
        this.filterArticles();
    }

    onAvailableArticleSelect(article: ArticleChanged, event) {
        article.new_available = event.target.checked ? 'Y' : 'N';
    }

    onArticleSelect(article: ArticleChanged) {
        this.selectedArticle = article;
    }

    ngOnInit() {
        this.mandants = MANDANTS;
        this.selectedMandant = MANDANTS[0];
        this.loadedMandants.push(MANDANTS[0]);
        this.getTypes();
        this.getArticlesByMandant(MANDANTS[0]);
    }
    
    ngOnChanges() {
        
    }

    filterArticles(articlesToFilter?: ArticleChanged[]) {
        let toFilter: ArticleChanged[];
        if (articlesToFilter == null) {
            toFilter = this.allArticles;
        }else {
            toFilter = articlesToFilter;
        }

        this.shownArticles = [];
        for (let i = 0; i < toFilter.length; i++) {
            if (toFilter[i].mand_id == this.selectedMandant.id) {
                if (this.selectedType.artt_id == null || (toFilter[i].artt_id == this.selectedType.artt_id)) {
                    if (this.showNotAvailable || (toFilter[i].available == 'Y')) {
                        if (this.showChanged) {
                            if (this.isArticleChanged(toFilter[i])) {
                                this.shownArticles.push(toFilter[i]);
                            }
                        } else {
                            this.shownArticles.push(toFilter[i]);
                        }
                    }
                }
            }
        }

    }


    getTypes() {
        this.articleService.getTypes()
            .subscribe(
                types => {
                    this.types = types;
                    this.types.unshift({artt_id: null, artt_name: 'ALL Types'});
                    this.selectedType = this.types[0];
                },
                error => this.errorMessage = <any>error

            );
    }

    getArticles() {
        this.articleService.getArticles()
            .subscribe(
                articles => {
                    this.allArticles = articles;
                    this.filterArticles();
                },
                error => this.errorMessage = <any>error
            );
    }

    getArticlesByMandant(mandant: Mandant) {
        this.articleService.getArticlesByMand(mandant.id)
            .subscribe(
                articles => {
                    for (let i = 0;i<10;i++) {
                        console.log(articles[i]);
                    }
                    this.allArticles = this.allArticles.concat(articles);
                    this.filterArticles(articles);
                }
            )
    }

    resetArticle(article: ArticleChanged) {
        article.new_reg_price = null;
        article.new_fin_price = null;
        article.new_available = article.available;
    }
    
    isArticleChanged(article: ArticleChanged) {
        return Boolean(article.new_reg_price || article.new_fin_price || (article.new_available && (article.available != article.new_available)));
    }

    createSQL() {
        // this.articleChangedService.saveList(this.changedArticles)
        //     .then(res => this.sqlArr = res);

        this.modal.prompt()
            .size('lg')
            .isBlocking(false)
            .showClose(true)
            .title("SQL Code - copy and go Priceupdate")
            .body(this.saveList(this.allArticles.filter(a => this.isArticleChanged(a))))
            .open();
    }

    saveList(articles: ArticleChanged[]) {
        let sql: string[] = [];
        for (let article of articles) {
            sql.push(this.transformToSql(article));
        }
        return sql.join('<br>');
    }

    transformToSql(article: ArticleChanged) {
        let base: string = 'update tb_article_info set ';
        let base2: string = ' where art_id = ' + article.art_id + ' and mand_id = ' + article.mand_id + ';';


        //price part
        let priceCmd: string = '';
        if (article.new_reg_price || article.new_fin_price) {
            let price_type:string = 'arti_regular_price';
            let new_price:number = article.new_reg_price;
            if (article.new_fin_price) {
                price_type = 'arti_final_price';
                new_price = article.new_fin_price;
            }
            priceCmd = price_type + ' = ' + new_price;
        }

        //available part
        let availCmd: string = '';
        if (article.available != article.new_available) {
            if (priceCmd != '')     availCmd += ', ';
            availCmd += 'arti_available = ' + article.new_available;
        }

        let ret = base + priceCmd + availCmd + base2;

        return ret;

    }

    goToPriceupdate(template) {
        
    }

}