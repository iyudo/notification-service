export interface Company {
    id: string,
    name: string
}

export interface User {
    // id?: string; // Optional to handle auto-generated IDs
    id: string;
    name: string;
    company: Company;
}