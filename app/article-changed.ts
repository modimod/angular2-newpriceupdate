import { Article } from './article';

export class ArticleChanged extends Article {
    new_reg_price: number;
    new_fin_price: number;
    new_available: string;
}