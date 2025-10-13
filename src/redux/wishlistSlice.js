// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [], // هنا بنخزن الكورسات كاملة مش IDs فقط
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//    addToWishlist: (state, action) => {
//   const course = action.payload;
//   const exists = state.items.find((item) => item.id === course.id);
//   if (!exists) {
//     state.items.push(course);
//   }
// },
// removeFromWishlist: (state, action) => {
//   const id = action.payload;
//   state.items = state.items.filter((item) => item.id !== id);
// },

//     setFavorites: (state, action) => {
//       state.items = action.payload || [];
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist, setFavorites } =
//   wishlistSlice.actions;

// export default wishlistSlice.reducer;







import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  items: [],
};

// دالة لحفظ البيانات في AsyncStorage
const saveToStorage = async (items) => {
  try {
    await AsyncStorage.setItem("wishlist", JSON.stringify(items));
  } catch (error) {
    console.log("Error saving wishlist:", error);
  }
};

// دالة لتحميل البيانات عند فتح التطبيق
export const loadWishlistFromStorage = () => async (dispatch) => {
  try {
    const data = await AsyncStorage.getItem("wishlist");
    if (data) {
      dispatch(setFavorites(JSON.parse(data)));
    }
  } catch (error) {
    console.log("Error loading wishlist:", error);
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const course = action.payload;
      const exists = state.items.some((item) => item.id === course.id);
      if (!exists) {
        state.items.push(course);
        saveToStorage(state.items); // نحفظ التغييرات
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveToStorage(state.items); // نحفظ بعد الحذف
    },
    setFavorites: (state, action) => {
      state.items = action.payload || [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, setFavorites } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
