export default class Article {
  constructor(private title: string, private description: string) {
    this.title = title;
    this.description = description;
  }

  get getTitle(): string {
    return this.title;
  }

  get getDescription(): string {
    return this.description;
  }
}
