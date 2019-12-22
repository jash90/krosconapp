export default class Type {
    public id: number = 0;
    public name: string = "";
    public Type() {
        this.id = 0;
        this.name = "";
    }
    public setType(type: Type) {
        this.id = type.id;
        this.name = type.name;
    }
    public clear() {
        this.setType(new Type());
    }
}
