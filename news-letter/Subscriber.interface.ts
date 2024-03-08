import { ArticleType } from "./ArticleType.enum";

export interface ISubscriber {
  notify(articleType: ArticleType): void;
}
