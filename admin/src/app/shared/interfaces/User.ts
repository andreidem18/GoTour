export interface User {
    id:               number;
    name:             string;
    email:            string;
    photo:            string;
    passwordChangeAt: string;
    role:             role;
    status:           string;
    createdAt:        string;
    updatedAt:        string;
}

export type role = 'user' | 'admin' | 'guide'
