import { atom, selector } from "recoil";
import axios from "axios";

export const adminTokenState = atom<string | null>({
    key: "adminTokenState",
    default: localStorage.getItem("adminToken"),
});

export const adminState = selector({
    key: 'adminState',
    get: async ({ get }) => {
        const token = get(adminTokenState);

        if (!token) return null;

        try {
            const { data } = await axios.get('/api/v1/admin/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("Admin DATA:", data.user)
            return data.user;
        } catch (error) {
            return null;
        }
    }
})

export const isAdminLoggedInState = selector<boolean>({
    key: "isAdminLoggedInState",
    get: async ({ get }) => {
        const token = get(adminTokenState);

        if (!token) return false;

        const user = get(adminState);
       
        if (!user || !user?.id) return false;
        
        return true;
    }
})