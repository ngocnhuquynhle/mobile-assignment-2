import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Have the best evening,{"\n"}Quinn Le 💫
          </Text>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() =>
              Alert.alert("Settings", "Settings will be available soon!")
            }
          >
            <Ionicons name="settings-outline" size={24} color="#222222" />
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => Alert.alert("Inbox", "You have no new messages.")}
          >
            <Ionicons name="mail-outline" size={24} color="#222222" />
            <Text style={styles.actionText}>Inbox</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              Alert.alert("Cafés", "Find your favourite Starbucks café!")
            }
          >
            <Ionicons name="location-outline" size={24} color="#222222" />
            <Text style={styles.actionText}>Cafés</Text>
          </TouchableOpacity>

          <View style={styles.actionSpacer} />

          <TouchableOpacity onPress={() => router.push("/order")}>
            <Ionicons name="receipt-outline" size={24} color="#222222" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.balanceCard}
          onPress={() => router.push("/rewards")}
          activeOpacity={0.85}
        >
          <Text style={styles.balanceLabel}>Star balance</Text>

          <Text style={styles.balanceNumber}>49★</Text>

          <View style={styles.statusRow}>
            <Text style={styles.statusText}>GREEN STATUS</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </View>

          <Ionicons
            name="star"
            size={95}
            color="#CBA258"
            style={styles.decorativeStar}
          />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Offers for you</Text>

        <View style={styles.offerCard}>
          <View style={styles.offerHeader}>
            <Text style={styles.offerSmallText}>Collect</Text>

            <Text style={styles.offerBigText}>30 Bonus Stars ⭐</Text>

            <Text style={styles.offerDate}>Oct 2 – Oct 4</Text>
          </View>

          <View style={styles.offerBody}>
            <Text style={styles.offerTitle}>
              Spend at least $15 for 30 Bonus Stars
            </Text>

            <Text style={styles.offerDescription}>
              Collect 30 Bonus Stars when you spend at least $15 pre-tax in a
              single order.
            </Text>

            <View style={styles.offerFooter}>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() =>
                  Alert.alert(
                    "Offer Activated",
                    "You have started the 30 Bonus Stars offer!",
                  )
                }
              >
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Terms",
                    "Spend at least $15 pre-tax in one order.",
                  )
                }
              >
                <Text style={styles.termsText}>Terms</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.offerCard}>
          <View style={styles.secondOfferHeader}>
            <Text style={styles.secondOfferSmall}>Collect</Text>

            <Text style={styles.secondOfferBig}>100 Bonus Stars ⭐</Text>

            <Text style={styles.secondOfferDate}>Sep 28 – Oct 4</Text>
          </View>

          <View style={styles.offerBody}>
            <Text style={styles.offerTitle}>Try these 3 delicious things</Text>

            <Text style={styles.offerDescription}>
              Order these favourites to collect Bonus Stars:
            </Text>

            <Text style={styles.offerItem}>• Strawberry Açaí Refresher</Text>

            <Text style={styles.offerItem}>• Iced Passion Tango Tea</Text>

            <Text style={styles.offerItem}>• A bakery item</Text>

            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => router.push("/scan")}
            >
              <Text style={styles.scanButtonText}>Scan in café</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => router.push("/order")}
        >
          <Ionicons name="cafe-outline" size={20} color="#FFFFFF" />

          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 65,
    paddingHorizontal: 22,
    paddingBottom: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  greeting: {
    fontSize: 29,
    fontWeight: "800",
    color: "#1E1E1E",
    lineHeight: 38,
    flex: 1,
  },

  settingsButton: {
    marginTop: 5,
    marginLeft: 10,
  },

  quickActions: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingBottom: 25,
    gap: 24,
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222222",
  },

  actionSpacer: {
    flex: 1,
  },

  balanceCard: {
    backgroundColor: "#006241",
    marginHorizontal: 18,
    marginTop: 22,
    borderRadius: 18,
    padding: 24,
    minHeight: 175,
    overflow: "hidden",
  },

  balanceLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },

  balanceNumber: {
    color: "#FFFFFF",
    fontSize: 46,
    fontWeight: "bold",
    marginTop: 8,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 5,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  decorativeStar: {
    position: "absolute",
    right: -10,
    top: 35,
    opacity: 0.7,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222222",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 18,
  },

  offerCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginBottom: 22,
    borderRadius: 18,
    overflow: "hidden",
  },

  offerHeader: {
    backgroundColor: "#123F32",
    padding: 24,
    minHeight: 150,
    justifyContent: "center",
  },

  offerSmallText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  offerBigText: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 6,
  },

  offerDate: {
    color: "#E6E6E6",
    fontSize: 13,
    marginTop: 10,
  },

  offerBody: {
    padding: 22,
  },

  offerTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222222",
    lineHeight: 28,
  },

  offerDescription: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 22,
    marginTop: 12,
  },

  offerFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },

  startButton: {
    backgroundColor: "#006241",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
  },

  startButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  termsText: {
    color: "#006241",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  secondOfferHeader: {
    backgroundColor: "#E8E2D3",
    padding: 24,
    minHeight: 150,
    justifyContent: "center",
  },

  secondOfferSmall: {
    color: "#333333",
    fontSize: 16,
  },

  secondOfferBig: {
    color: "#1E3932",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 6,
  },

  secondOfferDate: {
    color: "#666666",
    fontSize: 13,
    marginTop: 10,
  },

  offerItem: {
    fontSize: 14,
    color: "#333333",
    marginTop: 10,
    lineHeight: 20,
  },

  scanButton: {
    backgroundColor: "#006241",
    alignSelf: "flex-start",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 22,
  },

  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  orderButton: {
    backgroundColor: "#006241",
    marginHorizontal: 18,
    marginBottom: 20,
    paddingVertical: 17,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
