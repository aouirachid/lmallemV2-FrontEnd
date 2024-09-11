export class User{
    id: number;
    name: string;
    type: string;
    phone: string;
    email: string;
    city: string;
    username: string;
    role:string;
    password: string
    constructor(id: number,name: string,type: string,phone: string,email: string,city: string,username: string,role:string,password: string){
        this.id=id;
        this.name = name;
        this.type = type;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.username = username;
        this.role = role;
        this.password = password;
    }
}
