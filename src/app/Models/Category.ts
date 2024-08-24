export class Category {
    id:number;
    name:string;
    estimatedPrice:number;
    status:string;
    constructor(id:number,name:string,estimatedPrice:number,status:string) {
        this.id = id;
        this.name = name;
        this.estimatedPrice = estimatedPrice;
        this.status = status;
    }
}