export default class Mechanic {
    public id: number = 0;
    public name: string = "";
    public Mechanic() {
        this.id = 0;
        this.name = "";
    }
    public setMechanic(mechanic: Mechanic) {
        this.id = mechanic.id;
        this.name = mechanic.name;
    }
    public clear() {
        this.setMechanic(new Mechanic());
    }
}