export class Service{
    id:number;
    name:string;
    image:string;
    description:string;
    status:string;
    category_id:number;
    constructor(id:number,name:string,image:string,description:string,status:string,category_id:number){
        this.id=id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.category_id = category_id;
        this.status = status;
    }
}