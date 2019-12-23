export default class Publisher {
    public id: number = 0;
    public name: string = "";
    public Publisher() {
        this.id = 0;
        this.name = "";
    }
    public setPublisher(publisher: Publisher) {
        this.id = publisher.id;
        this.name = publisher.name;
    }
    public clear() {
        this.setPublisher(new Publisher());
    }
}