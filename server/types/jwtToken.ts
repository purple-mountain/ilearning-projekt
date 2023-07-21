export interface JwtToken {
    id: string,
    role: string,
    iat: number,
    exp: number
}
