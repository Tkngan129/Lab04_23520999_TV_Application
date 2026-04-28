import { TextInput, StyleSheet, View } from "react-native";
import colors from "../constants/colors";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
});
