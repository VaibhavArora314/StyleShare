import { atom, selector } from "recoil";
import axios from "axios";

export const tokenState = atom<string | null>({
    key: "tokenState",
    default: localStorage.getItem("authToken"),
})

export const userState = selector({
    key: 'authState',
    get: async ({ get }) => {
        const token = get(tokenState);

        if (!token) return null;

        try {
            const { data } = await axios.get('/api/v1/admin/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("DATA:",data)
            return data?.user;
        } catch (error) {
            return null;
        }
    }
})

export const loggedInState = selector<boolean>({
    key: "loggedInState",
    get: async ({get}) => {
        const token = get(tokenState);
        
        if (!token) return false;

        const user = get(userState);

        if (!user || !user?.id) return false;

        return true;
    }
})