import { Category } from './Category';

export class Service {
  id: number;
  name: string;
  image: string;
  description: string;
  status: string;
  category_id: number;
  category?: Category;
  constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    status: string,
    category_id: number,
    category?: Category
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.category_id = category_id;
    this.status = status;
    this.category = category;
  }
}
