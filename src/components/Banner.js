import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Banner({ movie }) {
  if (!movie) return null;

  return (
    <ImageBackground
      source={{
        uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      }}
      style={styles.banner}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.overlay}
      >
        <Text style={styles.title}>{movie.title}</Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 250,
    justifyContent: "flex-end",
  },
  overlay: {
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
