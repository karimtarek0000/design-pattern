export interface ISubscriber {
  notify(articleType: ArticleType): void;
}
