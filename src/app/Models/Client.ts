import { User } from "./User";

export class Client extends User {
  clientId: number;
  denomination: string;
  rc: number;
  ice: number;
  status: string;
  userId: number;
  user: User;
  constructor(
    id: number,
    name: string,
    type: string,
    phone: string,
    email: string,
    city: string,
    role: string,
    username: string,
    password: string,
    clientId: number,
    denomination: string,
    rc: number,
    ice: number,
    status: string,
    userId: number,
    user: User,
    token?: string
  ) {
    super(id, name, type, phone, email, city, username, role, password, token);
    this.clientId = clientId;
    this.denomination = denomination;
    this.rc = rc;
    this.ice = ice;
    this.status = status;
    this.userId = userId;
    this.user = user;
  }
}
