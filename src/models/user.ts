export interface User {
    ldap: string
    firstname: string
    lastname: string
    picture?: string
    email: string
    lastOrganizedBreakfastDate?: Date | null
    nextOrganizedBreakfastDate: string | null
    numberOfBreakFastOrganised?: number
    roles?: Role[]
    creationDate?: Date
    login: {
        username: string,
        password: string
    }
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}
