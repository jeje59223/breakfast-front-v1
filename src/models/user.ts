export interface User {
    ldap: string
    firstname: string
    lastname: string
    picture?: string
    email: string
    lastOrganizedBreakfastDate?: Date // a modifier en Date
    nextOrganizedBreakfastDate?: Date // a modifier en Date
    numberOfBreakFastOrganised: number
    roles?: Role[]
    creationDate: Date // a modifier en Date
    login: {
        username: string,
        password: string
    }
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}
