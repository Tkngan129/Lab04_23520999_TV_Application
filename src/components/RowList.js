import React, { memo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import colors from "../constants/colors";

function RowList({ title, data, renderItem, keyExtractor }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
        getItemLayout={(_, index) => ({ length: 180, offset: 180 * index, index })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    color: colors.primary,
    fontWeight: "700",
    marginLeft: 10,
    marginBottom: 6,
    fontSize: 18,
  },
});

export default memo(RowList);
