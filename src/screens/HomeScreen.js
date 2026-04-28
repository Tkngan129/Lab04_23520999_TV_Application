import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  fetchPopular,
  fetchTopRated,
  searchMovies,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import RowList from "../components/RowList";
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

  const keyExtractor = (item) => String(item.id || item._id || item.title);

  const renderMovie = ({ item }) => <MovieCard movie={item} navigation={navigation} />;

  return (
    <View style={styles.container}>
      <Banner movie={Array.isArray(popular) && popular.length > 0 ? popular[0] : null} />

      <View style={styles.searchRow}>
        <SearchBar value={query} onChange={handleSearch} />
        {searchResult.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery("");
              setSearchResult([]);
            }}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {searchResult.length > 0 ? (
        <RowList title="Search Results" data={searchResult} renderItem={renderMovie} keyExtractor={keyExtractor} />
      ) : (
        <>
          <RowList title="Popular" data={popular} renderItem={renderMovie} keyExtractor={keyExtractor} />
          <RowList title="Top Rated" data={topRated} renderItem={renderMovie} keyExtractor={keyExtractor} />
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  clearButton: {
    marginLeft: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearText: { color: "#fff", fontWeight: "700" },
});