// -----------------------
// Observer design pattern
// -----------------------
interface Subscriber {
  notify(message: string): void;
}

enum EventType {
  NEW_PRODUCT,
  NEW_OFFER,
  NEW_JOB,
}

class Customer implements Subscriber {
  constructor(private name: string) {
    this.name = name;
  }

  notify(message: string) {
    return console.log(`name: ${this.getName} / ${message}`);
  }

  get getName(): string {
    return this.name;
  }
}

class Product {
  constructor(private name: string, private price: number, private decription: string) {
    this.name = name;
    this.price = price;
    this.decription = decription;
  }

  get getName(): string {
    return this.name;
  }

  get getPrice(): number {
    return this.price;
  }

  get getDescription(): string {
    return this.decription;
  }
}

class Offer {
  constructor(private message: string) {
    this.message = message;
  }

  get getMessage(): string {
    return this.message;
  }
}

class Job {
  constructor(private title: string, private salary: number) {
    this.title = title;
    this.salary = salary;
  }

  get getTitle(): string {
    return this.title;
  }

  get getSalary(): number {
    return this.salary;
  }
}

class OnlineMarketPlace {
  private subscribers: Map<EventType, Subscriber[]>;
  private products: Product[];
  private offers: Offer[];
  private jobs: Job[];

  constructor() {
    this.subscribers = new Map();
    this.products = [];
    this.offers = [];
    this.jobs = [];

    this.initSubscriberEvent();
  }

  private initSubscriberEvent(): void {
    this.subscribers.set(EventType.NEW_PRODUCT, []);
    this.subscribers.set(EventType.NEW_OFFER, []);
    this.subscribers.set(EventType.NEW_JOB, []);
  }

  // Subscribe and unsubscribe
  public subscribe(eventType: EventType, subscriber: Subscriber): void {
    const eventTypeStatus = this.subscribers.get(eventType);
    eventTypeStatus && eventTypeStatus.push(subscriber);
  }

  public unsubscribe(eventType: EventType, subscriber: Subscriber): void {
    const eventTypeStatus = this.subscribers.get(eventType);
    eventTypeStatus && eventTypeStatus.splice(eventTypeStatus.indexOf(subscriber), 1);
  }

  // Added
  public addProduct(product: Product): void {
    this.products.push(product);
    this.notifySubscribers(EventType.NEW_PRODUCT, `New product added | ${product.getName} | price: ${product.getPrice}`);
  }

  public addOffer(offer: Offer): void {
    this.offers.push(offer);
    this.notifySubscribers(EventType.NEW_OFFER, `New offer added | ${offer.getMessage}`);
  }

  public addJob(job: Job) {
    this.jobs.push(job);
    this.notifySubscribers(EventType.NEW_JOB, `New job added | job: ${job.getTitle} | salary: ${job.getSalary}`);
  }

  // Notify
  notifySubscribers(eventType: EventType, message: string): void {
    const eventTypeStatus = this.subscribers.get(eventType);
    eventTypeStatus &&
      eventTypeStatus.forEach((subscriber) => {
        subscriber.notify(message);
      });
  }
}

// Implement
const ahmed = new Customer("ahmed");
const osama = new Customer("osama");
const mohamed = new Customer("mohamed");

const karimOnlineShopping = new OnlineMarketPlace();

karimOnlineShopping.subscribe(EventType.NEW_PRODUCT, ahmed);
karimOnlineShopping.subscribe(EventType.NEW_PRODUCT, mohamed);
karimOnlineShopping.subscribe(EventType.NEW_OFFER, ahmed);
karimOnlineShopping.subscribe(EventType.NEW_OFFER, mohamed);
karimOnlineShopping.subscribe(EventType.NEW_JOB, osama);

karimOnlineShopping.addProduct(new Product("iphone 13", 3000, "this iphone"));
karimOnlineShopping.addOffer(new Offer("Discount 10% off on iphone 13"));
karimOnlineShopping.addJob(new Job("sales", 5000));
