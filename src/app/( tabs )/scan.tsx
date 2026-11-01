import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ScanScreen() {
  const [activeTab, setActiveTab] = useState<"pay" | "scan">("scan");
  const [isDefault, setIsDefault] = useState(false);

  // Add Card
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [savedCards, setSavedCards] = useState<
    { id: number; name: string; number: string }[]
  >([]);

  const handleAddCard = () => {
    if (!cardName.trim() || !cardNumber.trim()) {
      return;
    }

    const newCard = {
      id: Date.now(),
      name: cardName.trim(),
      number: cardNumber.trim(),
    };

    setSavedCards((previousCards) => [...previousCards, newCard]);

    setCardName("");
    setCardNumber("");
    setShowAddCard(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.stars}>49★</Text>

          <Text style={styles.username}>Quinn Le</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddCard(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={30} color="#222222" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "pay" && styles.activeTab]}
            onPress={() => setActiveTab("pay")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "pay" && styles.activeTabText,
              ]}
            >
              Scan & pay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "scan" && styles.activeTab]}
            onPress={() => setActiveTab("scan")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "scan" && styles.activeTabText,
              ]}
            >
              Scan only
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Ionicons name="star" size={80} color="#D4AF37" />

            <Text style={styles.cardBrand}>STARBUCKS</Text>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>
              {activeTab === "scan" ? "Scan to earn Stars" : "Scan to pay"}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {activeTab === "scan" ? "Earns 1★ per $1" : "Starbucks Card"}
              </Text>
            </View>

            <View style={styles.qrContainer}>
              <Ionicons name="qr-code" size={170} color="#222222" />
            </View>

            <Text style={styles.qrDescription}>
              {activeTab === "scan"
                ? "Scan this code at the register to earn Stars."
                : "Demo payment card — not valid for purchases."}
            </Text>

            <TouchableOpacity
              style={styles.defaultButton}
              onPress={() => setIsDefault(!isDefault)}
            >
              <Ionicons
                name={isDefault ? "checkmark-circle" : "ellipse-outline"}
                size={22}
                color="#006241"
              />

              <Text style={styles.defaultText}>
                {isDefault ? "Default card" : "Make default"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {savedCards.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={styles.savedTitle}>My Cards</Text>

            {savedCards.map((card) => (
              <View key={card.id} style={styles.savedCard}>
                <Ionicons name="card-outline" size={27} color="#006241" />

                <View style={styles.savedCardInfo}>
                  <Text style={styles.savedCardName}>{card.name}</Text>

                  <Text style={styles.savedCardNumber}>
                    Demo card •••• {card.number.slice(-4)}
                  </Text>
                </View>

                <Ionicons
                  name="checkmark-circle-outline"
                  size={22}
                  color="#006241"
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showAddCard}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddCard(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Starbucks Card</Text>

              <TouchableOpacity onPress={() => setShowAddCard(false)}>
                <Ionicons name="close" size={26} color="#333333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Add a demo card to your account.
            </Text>

            <Text style={styles.inputLabel}>Card name</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. My Coffee Card"
              placeholderTextColor="#999999"
              value={cardName}
              onChangeText={setCardName}
            />

            <Text style={styles.inputLabel}>Demo card number</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter a demo number"
              placeholderTextColor="#999999"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              maxLength={16}
            />

            <Text style={styles.demoNote}>
              For assignment demonstration only. Do not enter real payment or
              gift card details.
            </Text>

            <TouchableOpacity
              style={[
                styles.saveButton,
                (!cardName.trim() || !cardNumber.trim()) &&
                  styles.disabledButton,
              ]}
              disabled={!cardName.trim() || !cardNumber.trim()}
              onPress={handleAddCard}
            >
              <Text style={styles.saveButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 65,
    paddingHorizontal: 22,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  stars: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222222",
  },

  username: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222222",
  },

  addButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  tabs: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 17,
  },

  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#006241",
  },

  tabText: {
    fontSize: 15,
    color: "#777777",
  },

  activeTabText: {
    color: "#006241",
    fontWeight: "bold",
  },

  card: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
  },

  cardTop: {
    backgroundColor: "#006241",
    height: 185,
    justifyContent: "center",
    alignItems: "center",
  },

  cardBrand: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 3,
    marginTop: 10,
  },

  cardBody: {
    padding: 24,
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222222",
    textAlign: "center",
  },

  badge: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 12,
  },

  badgeText: {
    fontSize: 13,
    color: "#333333",
  },

  qrContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },

  qrDescription: {
    fontSize: 13,
    color: "#666666",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },

  defaultButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 30,
  },

  defaultText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#006241",
  },

  savedSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  savedTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 15,
  },

  savedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  savedCardInfo: {
    flex: 1,
  },

  savedCardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
  },

  savedCardNumber: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 45,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222222",
  },

  modalDescription: {
    fontSize: 14,
    color: "#666666",
    marginTop: 12,
    marginBottom: 25,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222222",
    marginBottom: 20,
  },

  demoNote: {
    fontSize: 12,
    color: "#777777",
    lineHeight: 18,
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: "#006241",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#A7B8AE",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
