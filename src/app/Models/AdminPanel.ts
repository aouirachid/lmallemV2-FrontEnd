import { User } from "./User";

export class AdminPanel extends User {
        adminPanelId: number;
        image: string;
        status: string;
        userId: number;
        user: User;
    constructor(id: number,name: string,type: string,phone: string,email: string,city: string,role:string,username: string,password: string,adminPanelId: number,image: string,status: string,userId: number,user: User) {
        super(id, name, type, phone, email, city, username, password,role);
        this.adminPanelId = adminPanelId;
        this.image = image;
        this.status = status;
        this.userId = userId;
        this.user = user;
    }
}