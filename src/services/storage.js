import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FAVORITES";

export const saveFavorite = async (movie) => {
  const data = await AsyncStorage.getItem(KEY);
  let favorites = data ? JSON.parse(data) : [];

  favorites.push(movie);

  await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
};

export const getFavorites = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
