export class Role {
    id: number;
    name: string;
    permissions?: Permission[];

    constructor(id: number, name: string, permissions: Permission[] = []) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
}

export interface Permission {
    id: number;
    name: string;
}