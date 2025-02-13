import { User } from './User';

export class HandyMan extends User {
  handyManId: number;
  ice: number;
  specializedField: string;
  accountNumber: string;
  bankName: string;
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
    handyManId: number,
    ice: number,
    specializedField: string,
    accountNumber: string,
    bankName: string,
    status: string,
    userId: number,
    user: User,
    token?: string
  ) {
    super(id, name, type, phone, email, city, username, role, password, token);
    this.handyManId = handyManId;
    this.ice = ice;
    this.specializedField = specializedField;
    this.accountNumber = accountNumber;
    this.bankName = bankName;
    this.status = status;
    this.userId = userId;
    this.user = user;
  }
}
