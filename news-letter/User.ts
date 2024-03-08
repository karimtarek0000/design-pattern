import { ArticleType } from "./ArticleType.enum";
import { ISubscriber } from "./Subscriber.interface";

export default class User implements ISubscriber {
  constructor(protected name: string, protected email: string) {
    this.name = name;
    this.email = email;
  }

  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  notify(articleType: ArticleType): void {
    console.log(`${this.name} | New notify becouse a new article ${ArticleType[articleType]} added`);
  }
}
