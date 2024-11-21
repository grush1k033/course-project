export interface Token {
    accessToken: string,
}

export interface JwtPayload {
    id: string,
    name: string,
    email: string,
    isAdmin: number
}