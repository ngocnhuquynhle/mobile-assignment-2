import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DrinkCardProps = {
  name: string;
  category: string;
  price: number;
  image: string;
  onPress: () => void;
};

export default function DrinkCard({
  name,
  category,
  price,
  image,
  onPress,
}: DrinkCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.category}>{category}</Text>

        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  image: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: "#F3F3F3",
  },

  info: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
  },

  category: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
  },

  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#006241",
    marginTop: 8,
  },
});
