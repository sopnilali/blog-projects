
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserFromDB = async (payload: TUser) => {
    const result = await User.create(payload)
    return result;
}

const getUserFromDB = async () => {
    const result = await User.find()
    return result;

}



export const userServices = {
    createUserFromDB,
    getUserFromDB
}