import { Article } from "./article";

export interface ArticlesResult {
    count: number,
    next: string,
    results: Article[]
}