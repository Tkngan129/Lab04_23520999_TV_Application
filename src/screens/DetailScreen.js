import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function DetailScreen({ route }) {
  const movie = (route && route.params && route.params.movie) || null;

  return (
    <ScrollView>
      {movie && movie.poster_path ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.image}
        />
      ) : null}

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});