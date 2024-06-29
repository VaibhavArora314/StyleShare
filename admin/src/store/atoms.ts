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
      });
      console.log("Admin DATA:", data);
      return data?.admin;
    } catch (error) {
      return null;
    }
  }
});

export const isAdminLoggedInState = atom<boolean>({
  key: 'isAdminLoggedInState',
  default: !localStorage.getItem('adminToken'),
});