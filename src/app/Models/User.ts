export class User {
  id: number;
  name: string;
  type: string;
  phone: string;
  email: string;
  city: string;
  username: string;
  role: string;
  password: string;
  token?: string;
  constructor(
    id: number,
    name: string,
    type: string,
    phone: string,
    email: string,
    city: string,
    username: string,
    role: string,
    password: string,
    token?: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.phone = phone;
    this.email = email;
    this.city = city;
    this.username = username;
    this.role = role;
    this.password = password;
    this.token = token;
  }
  // Add a constructor that accepts minimal required fields
  // constructor(
  //   id: number,
  //   name: string,
  //   type: string,
  //   phone: string,
  //   email: string,
  //   city: string,
  //   username: string,
  //   role: string,
  //   password: string,
  //   token?: string
  // ) {
  //   this.id = id || 0;
  //   this.name = name || '';
  //   this.email = email || '';
  //   this.token = token;

  //   // Set other fields to default or empty values
  //   this.type = type || '';
  //   this.phone = phone || '';
  //   this.city = city || '';
  //   this.username = username || '';
  //   this.role = role || '';
  //   this.password = password || '';
  // }
}
