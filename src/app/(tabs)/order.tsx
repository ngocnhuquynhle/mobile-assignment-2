import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DrinkCard from "../../components/DrinkCard";
import { useCart } from "../../context/CartContext";

type MenuCategory = {
  id: number;
  name: string;
  section: string;
  image: string;
};

type Drink = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

type MenuTab = "Menu" | "Featured" | "Previous" | "Favourites";

const categories: MenuCategory[] = [
  {
    id: 1,
    name: "Trending",
    section: "The Latest",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
  },
  {
    id: 2,
    name: "Pumpkin Picks",
    section: "The Latest",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  },
  {
    id: 3,
    name: "Protein Beverages",
    section: "Protein",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400",
  },
  {
    id: 4,
    name: "Hot Coffee & Espresso",
    section: "Coffee & Espresso",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  },
  {
    id: 5,
    name: "Cold Coffee & Espresso",
    section: "Coffee & Espresso",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
  },
  {
    id: 6,
    name: "Tea & Matcha",
    section: "Tea",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400",
  },
];

const sections = ["The Latest", "Protein", "Coffee & Espresso", "Tea"];

const drinks: Drink[] = [
  {
    id: 1,
    name: "Iced Latte",
    category: "Cold Coffee & Espresso",
    price: 5.25,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
  },
  {
    id: 2,
    name: "Iced Caramel Macchiato",
    category: "Cold Coffee & Espresso",
    price: 6.45,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  },
  {
    id: 3,
    name: "Cold Brew",
    category: "Cold Coffee & Espresso",
    price: 4.95,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500",
  },
  {
    id: 4,
    name: "Cappuccino",
    category: "Hot Coffee & Espresso",
    price: 5.15,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
  },
  {
    id: 5,
    name: "Caffè Latte",
    category: "Hot Coffee & Espresso",
    price: 5.45,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  },
  {
    id: 6,
    name: "Iced Matcha Latte",
    category: "Tea & Matcha",
    price: 6.25,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500",
  },
  {
    id: 7,
    name: "Pumpkin Spice Latte",
    category: "Pumpkin Picks",
    price: 6.75,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
  },
  {
    id: 8,
    name: "Protein Latte",
    category: "Protein Beverages",
    price: 6.95,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500",
  },
  {
    id: 9,
    name: "Iced Caramel Latte",
    category: "Trending",
    price: 6.25,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  },
];

export default function OrderScreen() {
  const router = useRouter();

  const { cartItems, totalItems, totalPrice, removeFromCart, clearCart } =
    useCart();

  const [activeTab, setActiveTab] = useState<MenuTab>("Menu");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartVisible, setCartVisible] = useState(false);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesSection =
      selectedSection === null || category.section === selectedSection;

    return matchesSearch && matchesSection;
  });

  const visibleSections = sections.filter((section) =>
    filteredCategories.some((category) => category.section === section),
  );

  const selectedDrinks = drinks.filter(
    (drink) => drink.category === selectedCategory,
  );

  const openDrinkDetails = (drink: Drink) => {
    router.push({
      pathname: "/drink-details",
      params: {
        id: String(drink.id),
        name: drink.name,
        category: drink.category,
        price: String(drink.price),
        image: drink.image,
      },
    });
  };

  const resetMenu = () => {
    setSelectedCategory(null);
    setSelectedSection(null);
    setSearchText("");
  };

  const confirmClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: clearCart,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order</Text>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            setSearchVisible(!searchVisible);
            resetMenu();
            setActiveTab("Menu");
          }}
        >
          <Ionicons
            name={searchVisible ? "close" : "search-outline"}
            size={26}
            color="#222222"
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      {searchVisible && (
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#777777" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search menu categories..."
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
          />
        </View>
      )}

      {/* MENU TABS */}
      <View style={styles.menuTabs}>
        {(["Menu", "Featured", "Previous", "Favourites"] as MenuTab[]).map(
          (tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.menuTab,
                activeTab === tab && styles.activeMenuTab,
              ]}
              onPress={() => {
                setActiveTab(tab);
                resetMenu();
              }}
            >
              <Text
                style={[
                  styles.menuTabText,
                  activeTab === tab && styles.activeMenuTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === "Menu" ? (
          selectedCategory !== null ? (
            <View>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedCategory(null)}
              >
                <Ionicons name="arrow-back" size={20} color="#006241" />
                <Text style={styles.backText}>Back to Menu</Text>
              </TouchableOpacity>

              <Text style={styles.drinkListTitle}>{selectedCategory}</Text>

              {selectedDrinks.length > 0 ? (
                selectedDrinks.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    name={drink.name}
                    category={drink.category}
                    price={drink.price}
                    image={drink.image}
                    onPress={() => openDrinkDetails(drink)}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Ionicons name="cafe-outline" size={45} color="#999999" />
                  <Text style={styles.emptyText}>
                    No drinks available in this category yet.
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <>
              {selectedSection !== null && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setSelectedSection(null)}
                >
                  <Ionicons name="arrow-back" size={20} color="#006241" />
                  <Text style={styles.backText}>All categories</Text>
                </TouchableOpacity>
              )}

              {visibleSections.map((section) => {
                const sectionCategories = filteredCategories.filter(
                  (category) => category.section === section,
                );

                return (
                  <View key={section} style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>{section}</Text>

                      <TouchableOpacity
                        onPress={() => setSelectedSection(section)}
                      >
                        <Text style={styles.seeAll}>See all</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.categoryRow}>
                      {sectionCategories.map((category) => (
                        <TouchableOpacity
                          key={category.id}
                          style={styles.categoryCard}
                          activeOpacity={0.8}
                          onPress={() => setSelectedCategory(category.name)}
                        >
                          <Image
                            source={{ uri: category.image }}
                            style={styles.categoryImage}
                          />
                          <Text style={styles.categoryName}>
                            {category.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                );
              })}

              {filteredCategories.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Ionicons name="search-outline" size={42} color="#999999" />
                  <Text style={styles.emptyText}>No categories found</Text>
                </View>
              )}
            </>
          )
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name={
                activeTab === "Favourites"
                  ? "heart-outline"
                  : activeTab === "Previous"
                    ? "time-outline"
                    : "sparkles-outline"
              }
              size={52}
              color="#006241"
            />

            <Text style={styles.emptyTitle}>{activeTab}</Text>

            <Text style={styles.emptyText}>
              {activeTab === "Featured"
                ? "Discover featured drinks and seasonal favourites."
                : activeTab === "Previous"
                  ? "Your previous orders will appear here."
                  : "Your favourite drinks will appear here."}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* CART BAR */}
      <TouchableOpacity
        style={styles.cartBar}
        onPress={() => setCartVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="bag-outline" size={22} color="#FFFFFF" />

        <Text style={styles.cartText}>
          {totalItems === 0
            ? "No items in cart"
            : `${totalItems} ${totalItems === 1 ? "item" : "items"} · $${totalPrice.toFixed(2)}`}
        </Text>

        {totalItems > 0 && (
          <Ionicons name="chevron-up" size={20} color="#FFFFFF" />
        )}
      </TouchableOpacity>

      {/* CART MODAL */}
      <Modal
        visible={cartVisible}
        animationType="slide"
        onRequestClose={() => setCartVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Your Cart</Text>

            <TouchableOpacity onPress={() => setCartVisible(false)}>
              <Ionicons name="close" size={28} color="#222222" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="bag-outline" size={65} color="#A0A0A0" />
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptyText}>
                  Add your favourite drinks to get started.
                </Text>
              </View>
            ) : (
              cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cartImage}
                  />

                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemQuantity}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={styles.cartItemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    accessibilityLabel={`Remove ${item.name}`}
                  >
                    <Ionicons name="trash-outline" size={23} color="#B3261E" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>

          {cartItems.length > 0 && (
            <View style={styles.cartFooter}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
              </View>

              <Text style={styles.demoNote}>
                Demo cart only. No payment or order will be placed.
              </Text>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={confirmClearCart}
              >
                <Text style={styles.clearButtonText}>Clear Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 65,
    paddingHorizontal: 24,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#222222",
  },
  searchButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222222",
  },
  menuTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  menuTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  activeMenuTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#006241",
  },
  menuTabText: {
    fontSize: 14,
    color: "#777777",
    fontWeight: "500",
  },
  activeMenuTabText: {
    color: "#006241",
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 22,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222222",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: "#006241",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 18,
  },
  categoryCard: {
    width: "45%",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryImage: {
    width: 145,
    height: 145,
    borderRadius: 73,
    backgroundColor: "#F1F1F1",
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222222",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 21,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 22,
    marginTop: 22,
  },
  backText: {
    fontSize: 15,
    color: "#006241",
    fontWeight: "600",
  },
  drinkListTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222222",
    marginHorizontal: 22,
    marginTop: 25,
    marginBottom: 15,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    paddingVertical: 75,
  },
  emptyTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222222",
    marginTop: 18,
  },
  emptyText: {
    fontSize: 15,
    color: "#777777",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  cartBar: {
    backgroundColor: "#006241",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 30,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  cartText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    paddingTop: 65,
    paddingHorizontal: 24,
    paddingBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: "#222222",
  },
  modalScroll: {
    paddingBottom: 25,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 15,
  },
  cartImage: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#F2F2F2",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#006241",
    marginTop: 7,
  },
  cartFooter: {
    padding: 22,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#006241",
  },
  demoNote: {
    fontSize: 12,
    color: "#777777",
    marginBottom: 18,
  },
  clearButton: {
    borderWidth: 1.5,
    borderColor: "#B3261E",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B3261E",
  },
});
