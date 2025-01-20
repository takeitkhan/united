import { customFetch } from "./customFetch";

export const getNavData = async () => {
  try {
    const menuRes = await customFetch(`/menus?menu=1`);
    const settingsRes = await customFetch(
      `/frontend/settings?meta_group=General`,
      { next: { revalidate: 30 } }
    );

    // console.log("res", settingsRes);

    const menuItems = menuRes?.data?.items || [];
    const settings = settingsRes || {};

    return {
      menuItems,
      settings,
    };
  } catch (error) {
    // Handle the error as needed (e.g., fallback data)
    console.error("Error fetching nav data:", error);
    return { menuItems: [], settings: {} }; // Fallback to default data
  }
};
