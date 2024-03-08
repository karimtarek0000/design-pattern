import { ArticleType } from "./ArticleType.enum";
import User from "./User";

export default class Author extends User {
  constructor(
    protected name: string,
    protected email: string,
    protected bio: string,
    protected interstedArticleTypes: ArticleType[]
  ) {
    super(name, email);
    this.bio = bio;
    this.interstedArticleTypes = interstedArticleTypes;
  }
}
