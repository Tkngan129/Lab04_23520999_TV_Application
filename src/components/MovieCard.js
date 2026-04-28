import { useRef, useCallback } from "react";
import { saveFavorite } from "../services/storage";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";

export default function MovieCard({ movie, navigation }) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onFocus = () => {
    Animated.spring(scale, { toValue: 1.08, useNativeDriver: true }).start();
  };

  const onBlur = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleNavigate = useCallback(() => {
    navigation.navigate("Detail", { movie });
  }, [navigation, movie]);

  return (
    <Pressable
      onPress={handleNavigate}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ marginHorizontal: 6 }}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.meta}>
          <Text numberOfLines={2} style={styles.title}>
            {movie.title}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.heart}
          onPress={() => saveFavorite(movie)}
        >
          <Text>❤️</Text>
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    margin: 10,
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },
  title: {
    marginTop: 8,
    fontWeight: "700",
    color: colors.text,
    fontSize: 14,
  },
  meta: {
    marginTop: 8,
    minHeight: 44,
  },
  heart: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
