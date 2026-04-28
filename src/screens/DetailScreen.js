import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, SafeAreaView } from "react-native";
import colors from "../constants/colors";
import { saveFavorite } from "../services/storage";

export default function DetailScreen({ route, navigation }) {
  const movie = (route && route.params && route.params.movie) || null;

  if (!movie) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No movie selected</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.posterWrap}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.laterButton}
            onPress={() => saveFavorite(movie)}
          >
            <Text style={styles.laterText}>Later</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.watchFloating}
            onPress={() => {
              const url = `https://www.themoviedb.org/movie/${movie.id}`;
              Linking.canOpenURL(url).then((supported) => supported && Linking.openURL(url));
            }}
          >
            <Text style={styles.watchText}>Watch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
  posterWrap: {
    marginHorizontal: 16,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: colors.soft,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 410,
  },
  content: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "left",
    color: colors.text,
    marginBottom: 12,
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  backText: {
    color: colors.primary,
    fontWeight: "700",
  },
  overview: {
    marginTop: 2,
    color: colors.text,
    textAlign: "left",
    lineHeight: 23,
    fontSize: 15,
  },
  actionRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  watchButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: "flex-start",
    flex: 1,
  },
  laterButton: {
    backgroundColor: "#efefef",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  laterText: { color: "#333", fontWeight: "700", textAlign: "center" },
  watchFloating: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  watchText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});