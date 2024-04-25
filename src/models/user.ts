export interface User {
    ldap: string
    firstname: string
    lastname: string
    picture?: string
    numberOfBreakFastOrganised: number
    email: string
    lastOrganizedBreakfastDate?: string
    nextOrganizedBreakfastDate?: string
    roles?: string[]
    creationDate: string
    login: {
        username: string,
        password: string
    }
}
