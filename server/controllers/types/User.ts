export interface User {
    username: string,
    email: string,
    name: string,
    password: string,
}

export interface LoginUser {
    username: string,
    password: string
}

export interface JwtToken {
    id: string,
    role: string,
    iat: number,
    exp: number
}
