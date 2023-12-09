export interface User {
    id: string
    firstname: string
    lastname: string
    picture?: string
    nbBreakfast: number
    email: string
    lastOrganizedBreakfastDate?: string
    nextOrganizedBreakfastDate?: string
    role?: "USER" | "ADMIN"
    creationDate?: string
    login: {
        username: string,
        password: string
    }
}
