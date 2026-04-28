import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import {
  fetchPopular,
  fetchTopRated,
  searchMovies,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import colors from "../constants/colors";

export default function HomeScreen({ navigation }) {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  console.log("HomeScreen state:", { popular, topRated, query, searchResult });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const p = await fetchPopular();
      const t = await fetchTopRated();
      setPopular(Array.isArray(p) ? p : []);
      setTopRated(Array.isArray(t) ? t : []);
    } catch (e) {
      setPopular([]);
      setTopRated([]);
    }
  };

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const result = await searchMovies(text);
        setSearchResult(Array.isArray(result) ? result : []);
      } catch (e) {
        setSearchResult([]);
      }
    } else {
      setSearchResult([]);
    }
  };

  return (
    <View style={styles.container}>
      <Banner movie={Array.isArray(popular) && popular.length > 0 ? popular[0] : null} />

      <SearchBar value={query} onChange={handleSearch} />

      {searchResult.length > 0 ? (
        <>
          <Text style={styles.title}>Search Result</Text>
          <FlatList
            data={searchResult}
            horizontal
            renderItem={({ item }) => (
              <MovieCard movie={item} navigation={navigation} />
            )}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Popular</Text>
          <FlatList
            data={popular}
            horizontal
            renderItem={({ item }) => (
              <MovieCard movie={item} navigation={navigation} />
            )}
          />

          <Text style={styles.title}>Top Rated</Text>
          <FlatList
            data={topRated}
            horizontal
            renderItem={({ item }) => (
              <MovieCard movie={item} navigation={navigation} />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: colors.primary,
  },
});