import Article from "./Article";
import { ArticleType } from "./ArticleType.enum";
import Author from "./Author";
import { ISubscriber } from "./Subscriber.interface";
import User from "./User";

class NewsLetterManager {
  private subscribers: Map<ArticleType, ISubscriber[]>;
  private articles: Article[];

  constructor() {
    this.subscribers = new Map();
    this.articles = [];
  }

  public subscribe(articleType: ArticleType, subscriber: ISubscriber): void {
    const articleTypeExist = this.subscribers.get(articleType);
    !articleTypeExist ? this.subscribers.set(articleType, [subscriber]) : articleTypeExist.push(subscriber);
  }

  public unsubscribe(articleType: ArticleType, subscriber: ISubscriber): void {
    const articleTypeExist = this.subscribers.get(articleType);
    articleTypeExist && articleTypeExist.splice(articleTypeExist.indexOf(subscriber), 1);
  }

  public addArticle(articleType: ArticleType, article: Article): void {
    this.articles.push(article);
    this.notifySubscribers(articleType);
  }

  notifySubscribers(articleType: ArticleType) {
    const articleTypeExist = this.subscribers.get(articleType);
    articleTypeExist && articleTypeExist.forEach((subscriber) => subscriber.notify(articleType));
  }
}

// Implement
const newsLetterManager = new NewsLetterManager();

// Users
const karim = new User("karim", "karim@gmail.com");
const merna = new User("merna", "merna@gmail.com");

// Authors
const mohamedAuthor = new Author("mohamed", "mohamed@gmail.com", "author", [ArticleType.DESIGN, ArticleType.WEB]);
const osamaAuthor = new Author("osama", "osama@gmail.com", "author", [ArticleType.UIUX, ArticleType.WEB]);

// Articles
const designPattern = new Article("design pattern", "this is design pattern");
const uiux = new Article("typogrhpy", "typography new fonts");

newsLetterManager.subscribe(ArticleType.WEB, karim);
newsLetterManager.subscribe(ArticleType.UIUX, merna);

newsLetterManager.addArticle(ArticleType.WEB, designPattern);
newsLetterManager.addArticle(ArticleType.UIUX, uiux);
