import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type RewardTab = "earn" | "status";

type Reward = {
  id: number;
  stars: number;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const rewards: Reward[] = [
  {
    id: 1,
    stars: 25,
    title: "Customize your drink",
    description: "Add an eligible customization to your drink.",
    icon: "cafe-outline",
  },
  {
    id: 2,
    stars: 100,
    title: "Brewed coffee or tea",
    description: "Enjoy an eligible coffee or tea reward.",
    icon: "restaurant-outline",
  },
  {
    id: 3,
    stars: 200,
    title: "Handcrafted drink",
    description: "Redeem for an eligible handcrafted beverage.",
    icon: "wine-outline",
  },
  {
    id: 4,
    stars: 300,
    title: "Coffee at home",
    description: "Explore eligible packaged coffee rewards.",
    icon: "gift-outline",
  },
];

export default function RewardsScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<RewardTab>("earn");

  const currentStars = 49;
  const nextMilestone = 100;
  const progress = (currentStars / nextMilestone) * 100;

  const handleRedeem = (reward: Reward) => {
    if (currentStars < reward.stars) {
      Alert.alert(
        "Not enough Stars",
        `You need ${reward.stars - currentStars} more Stars to unlock this reward.`,
      );
      return;
    }

    Alert.alert(
      "Reward Available",
      `${reward.title}\n\nThis is a demo reward for Assignment 2. No Stars will be deducted.`,
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Starbucks® Rewards</Text>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Rewards Info",
              "This is a Starbucks-inspired demo rewards screen.",
            )
          }
        >
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#222222"
          />
        </TouchableOpacity>
      </View>

      {/* TOP TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "earn" && styles.activeTab]}
          onPress={() => setActiveTab("earn")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "earn" && styles.activeTabText,
            ]}
          >
            Earn & Redeem
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "status" && styles.activeTab]}
          onPress={() => setActiveTab("status")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "status" && styles.activeTabText,
            ]}
          >
            Status & Benefits
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === "earn" ? (
          <>
            {/* STAR BALANCE */}
            <View style={styles.balanceSection}>
              <Text style={styles.eyebrow}>YOUR REWARDS</Text>

              <View style={styles.starsRow}>
                <Text style={styles.starsNumber}>{currentStars}</Text>

                <Ionicons name="star" size={38} color="#CBA84C" />
              </View>

              <Text style={styles.starsLabel}>Stars available to redeem</Text>

              <View style={styles.progressBackground}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>

              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>{currentStars} Stars</Text>

                <Text style={styles.progressText}>{nextMilestone} Stars</Text>
              </View>

              <Text style={styles.progressDescription}>
                {nextMilestone - currentStars} more Stars until your next
                milestone!
              </Text>

              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => router.push("/scan")}
              >
                <Ionicons name="qr-code-outline" size={20} color="#FFFFFF" />

                <Text style={styles.scanButtonText}>Scan to earn Stars</Text>
              </TouchableOpacity>
            </View>

            {/* JUST FOR YOU */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Just for you</Text>

              <View style={styles.offerCard}>
                <View style={styles.offerIcon}>
                  <Ionicons name="sparkles" size={32} color="#006241" />
                </View>

                <View style={styles.offerInfo}>
                  <Text style={styles.offerTitle}>
                    A little something extra
                  </Text>

                  <Text style={styles.offerDescription}>
                    Explore rewards and discover new favorites.
                  </Text>

                  <TouchableOpacity onPress={() => router.push("/order")}>
                    <Text style={styles.offerLink}>Explore Menu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* REDEEM REWARDS */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Redeem your Stars</Text>

              <Text style={styles.sectionDescription}>
                Choose a reward to see what your Stars can unlock.
              </Text>

              {rewards.map((reward) => {
                const canRedeem = currentStars >= reward.stars;

                return (
                  <View key={reward.id} style={styles.rewardCard}>
                    <View style={styles.rewardIcon}>
                      <Ionicons name={reward.icon} size={33} color="#006241" />
                    </View>

                    <View style={styles.rewardInfo}>
                      <Text style={styles.rewardStars}>{reward.stars}★</Text>

                      <Text style={styles.rewardTitle}>{reward.title}</Text>

                      <Text style={styles.rewardDescription}>
                        {reward.description}
                      </Text>

                      <TouchableOpacity
                        style={[
                          styles.redeemButton,
                          !canRedeem && styles.lockedButton,
                        ]}
                        onPress={() => handleRedeem(reward)}
                      >
                        <Text
                          style={[
                            styles.redeemText,
                            !canRedeem && styles.lockedText,
                          ]}
                        >
                          {canRedeem ? "Redeem" : "View reward"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <>
            {/* STATUS SCREEN */}
            <View style={styles.statusHero}>
              <Ionicons name="star" size={54} color="#CBA84C" />

              <Text style={styles.statusTitle}>Your Rewards Journey</Text>

              <Text style={styles.statusDescription}>
                Keep collecting Stars and enjoy more of what you love.
              </Text>

              <Text style={styles.statusStars}>{currentStars}★</Text>

              <Text style={styles.statusStarsLabel}>Current Stars</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Member Benefits</Text>

              <View style={styles.benefitCard}>
                <Ionicons name="star-outline" size={27} color="#006241" />

                <View style={styles.benefitInfo}>
                  <Text style={styles.benefitTitle}>Earn Stars</Text>

                  <Text style={styles.benefitDescription}>
                    Collect Stars on eligible purchases.
                  </Text>
                </View>
              </View>

              <View style={styles.benefitCard}>
                <Ionicons name="gift-outline" size={27} color="#006241" />

                <View style={styles.benefitInfo}>
                  <Text style={styles.benefitTitle}>Redeem Rewards</Text>

                  <Text style={styles.benefitDescription}>
                    Use Stars to explore available rewards.
                  </Text>
                </View>
              </View>

              <View style={styles.benefitCard}>
                <Ionicons name="heart-outline" size={27} color="#006241" />

                <View style={styles.benefitInfo}>
                  <Text style={styles.benefitTitle}>Special Offers</Text>

                  <Text style={styles.benefitDescription}>
                    Discover personalized offers in the app.
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.statusButton}
              onPress={() => setActiveTab("earn")}
            >
              <Text style={styles.statusButtonText}>Explore Rewards</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EE",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 65,
    paddingHorizontal: 22,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#222222",
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },

  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#006241",
  },

  tabText: {
    fontSize: 14,
    color: "#777777",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#006241",
    fontWeight: "bold",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  balanceSection: {
    backgroundColor: "#E8F0E8",
    paddingHorizontal: 25,
    paddingTop: 32,
    paddingBottom: 35,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#006241",
    letterSpacing: 2,
  },

  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },

  starsNumber: {
    fontSize: 64,
    fontWeight: "800",
    color: "#1E3932",
  },

  starsLabel: {
    fontSize: 16,
    color: "#1E3932",
    marginTop: 2,
  },

  progressBackground: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#C9D8CB",
    marginTop: 25,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#006241",
    borderRadius: 10,
  },

  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },

  progressText: {
    fontSize: 12,
    color: "#426258",
    fontWeight: "600",
  },

  progressDescription: {
    fontSize: 14,
    color: "#426258",
    marginTop: 18,
  },

  scanButton: {
    backgroundColor: "#006241",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 25,
    alignSelf: "flex-start",
  },

  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  section: {
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E3932",
    marginBottom: 15,
  },

  sectionDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 21,
    marginBottom: 20,
  },

  offerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    gap: 16,
  },

  offerIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#E8F0E8",
    alignItems: "center",
    justifyContent: "center",
  },

  offerInfo: {
    flex: 1,
  },

  offerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
  },

  offerDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 21,
    marginTop: 8,
  },

  offerLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#006241",
    marginTop: 14,
  },

  rewardCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    marginBottom: 15,
  },

  rewardIcon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#E8F0E8",
    justifyContent: "center",
    alignItems: "center",
  },

  rewardInfo: {
    flex: 1,
  },

  rewardStars: {
    fontSize: 20,
    fontWeight: "800",
    color: "#006241",
  },

  rewardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
    marginTop: 6,
  },

  rewardDescription: {
    fontSize: 13,
    color: "#777777",
    lineHeight: 19,
    marginTop: 7,
  },

  redeemButton: {
    alignSelf: "flex-start",
    backgroundColor: "#006241",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
  },

  lockedButton: {
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },

  redeemText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  lockedText: {
    color: "#555555",
  },

  statusHero: {
    backgroundColor: "#E8F0E8",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  statusTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E3932",
    marginTop: 18,
    textAlign: "center",
  },

  statusDescription: {
    fontSize: 15,
    color: "#426258",
    textAlign: "center",
    lineHeight: 23,
    marginTop: 12,
  },

  statusStars: {
    fontSize: 45,
    fontWeight: "800",
    color: "#006241",
    marginTop: 25,
  },

  statusStarsLabel: {
    fontSize: 14,
    color: "#426258",
    marginTop: 4,
  },

  benefitCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 13,
  },

  benefitInfo: {
    flex: 1,
  },

  benefitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
  },

  benefitDescription: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
    lineHeight: 19,
  },

  statusButton: {
    backgroundColor: "#006241",
    borderRadius: 30,
    paddingVertical: 17,
    alignItems: "center",
    marginHorizontal: 22,
    marginTop: 25,
  },

  statusButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
