import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function DrinkDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const id = typeof params.id === "string" ? params.id : "";
  const name = typeof params.name === "string" ? params.name : "Drink";
  const category =
    typeof params.category === "string"
      ? params.category
      : "Starbucks Beverage";
  const image = typeof params.image === "string" ? params.image : "";

  const parsedPrice = Number(params.price);
  const price =
    Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : 0;

  const totalPrice = price * quantity;

  const increaseQuantity = () => {
    setQuantity((previous) => Math.min(previous + 1, 20));
  };

  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(previous - 1, 1));
  };

  const handleAddToOrder = () => {
    if (!id || price <= 0) {
      Alert.alert(
        "Unable to add item",
        "Please select a drink from the Order menu.",
      );
      return;
    }

    addToCart({
      id,
      name,
      price,
      image,
      quantity,
    });

    Alert.alert(
      "Added to Order!",
      `${quantity} × ${name} added to your cart.`,
      [
        {
          text: "Continue Shopping",
          onPress: () => router.back(),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* DRINK IMAGE */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.drinkImage}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="cafe-outline" size={90} color="#006241" />
          )}
        </View>

        {/* DRINK INFORMATION */}
        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{category}</Text>

          <Text style={styles.drinkName}>{name}</Text>

          <Text style={styles.price}>${price.toFixed(2)}</Text>

          <View style={styles.divider} />

          {/* SIZE */}
          <Text style={styles.sectionTitle}>Size</Text>

          <View style={styles.sizeCard}>
            <Ionicons name="cafe-outline" size={27} color="#006241" />

            <View style={styles.sizeInfo}>
              <Text style={styles.sizeName}>Grande</Text>
              <Text style={styles.sizeDescription}>16 fl oz</Text>
            </View>

            <Ionicons name="checkmark-circle" size={25} color="#006241" />
          </View>

          <View style={styles.divider} />

          {/* QUANTITY */}
          <Text style={styles.sectionTitle}>Quantity</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
              disabled={quantity === 1}
            >
              <Ionicons
                name="remove"
                size={25}
                color={quantity === 1 ? "#BBBBBB" : "#006241"}
              />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
              disabled={quantity === 20}
            >
              <Ionicons
                name="add"
                size={25}
                color={quantity === 20 ? "#BBBBBB" : "#006241"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* DESCRIPTION */}
          <View style={styles.descriptionContainer}>
            <Ionicons
              name="information-circle-outline"
              size={23}
              color="#006241"
            />

            <Text style={styles.description}>
              Made just for you. Enjoy your favourite Starbucks-inspired
              beverage.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ADD TO ORDER BUTTON */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>

          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToOrder}
          activeOpacity={0.8}
        >
          <Ionicons name="bag-add-outline" size={23} color="#FFFFFF" />

          <Text style={styles.addButtonText}>Add to Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  imageContainer: {
    height: 300,
    backgroundColor: "#F2F5F0",
    justifyContent: "center",
    alignItems: "center",
  },

  drinkImage: {
    width: "100%",
    height: "100%",
  },

  detailsContainer: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },

  category: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 8,
  },

  drinkName: {
    fontSize: 29,
    fontWeight: "800",
    color: "#222222",
    marginBottom: 12,
  },

  price: {
    fontSize: 21,
    fontWeight: "700",
    color: "#006241",
  },

  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: 27,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 18,
  },

  sizeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#006241",
    borderRadius: 15,
    padding: 18,
    backgroundColor: "#F7FAF8",
  },

  sizeInfo: {
    flex: 1,
    marginLeft: 15,
  },

  sizeName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222222",
  },

  sizeDescription: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 35,
  },

  quantityButton: {
    width: 48,
    height: 48,
    borderWidth: 1.5,
    borderColor: "#006241",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222222",
    minWidth: 30,
    textAlign: "center",
  },

  descriptionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  description: {
    flex: 1,
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
  },

  bottomContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 17,
    color: "#555555",
  },

  totalPrice: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222222",
  },

  addButton: {
    backgroundColor: "#006241",
    borderRadius: 30,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
