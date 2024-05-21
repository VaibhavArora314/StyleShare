import { Request } from "express"

interface UserAuthRequest extends Request {
    userId?: string,
}

export {
    UserAuthRequest
}