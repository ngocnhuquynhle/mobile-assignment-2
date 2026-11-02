import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Alert,
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

type GiftCard = {
  id: number;
  title: string;
  message: string;
  background: string;
  foreground: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const giftCards: GiftCard[] = [
  {
    id: 1,
    title: "Birthday",
    message: "Make a wish!",
    background: "#F8DDE5",
    foreground: "#A13C65",
    icon: "gift-outline",
  },
  {
    id: 2,
    title: "Thank You",
    message: "You're appreciated",
    background: "#DDECE0",
    foreground: "#006241",
    icon: "heart-outline",
  },
  {
    id: 3,
    title: "Celebration",
    message: "Cheers to you!",
    background: "#1E3932",
    foreground: "#E7C76F",
    icon: "sparkles-outline",
  },
  {
    id: 4,
    title: "Just Because",
    message: "Coffee is on me",
    background: "#F4E8D8",
    foreground: "#855D3B",
    icon: "cafe-outline",
  },
];

const amounts = [10, 25, 50];

export default function GiftsScreen() {
  const [selectedCard, setSelectedCard] = useState<GiftCard>(giftCards[0]);

  const [selectedAmount, setSelectedAmount] = useState<number>(25);

  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("Quinn Le");
  const [giftMessage, setGiftMessage] = useState("");

  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = () => {
    if (!recipientName.trim()) {
      Alert.alert("Recipient required", "Please enter the recipient's name.");
      return;
    }

    if (!senderName.trim()) {
      Alert.alert("Sender required", "Please enter your name.");
      return;
    }

    setPreviewVisible(true);
  };

  const handleSendDemo = () => {
    setPreviewVisible(false);

    Alert.alert(
      "Gift Preview Complete!",
      `Your $${selectedAmount} demo gift for ${recipientName.trim()} is ready.\n\nNo payment was made and no gift card was sent.`,
      [
        {
          text: "OK",
          onPress: () => {
            setRecipientName("");
            setGiftMessage("");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Gift</Text>

            <Text style={styles.headerSubtitle}>Share a little happiness.</Text>
          </View>

          <Ionicons name="gift-outline" size={30} color="#006241" />
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="heart" size={35} color="#E7C76F" />
          </View>

          <Text style={styles.heroTitle}>A little gift, a lot of love.</Text>

          <Text style={styles.heroDescription}>
            Brighten someone's day with a thoughtful coffee gift.
          </Text>
        </View>

        {/* GIFT CARD SELECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a gift card</Text>

          <Text style={styles.sectionDescription}>
            Pick a design for your special occasion.
          </Text>

          <View style={styles.cardGrid}>
            {giftCards.map((card) => {
              const isSelected = selectedCard.id === card.id;

              return (
                <TouchableOpacity
                  key={card.id}
                  style={styles.cardOption}
                  onPress={() => setSelectedCard(card)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.giftCard,
                      {
                        backgroundColor: card.background,
                      },
                      isSelected && styles.selectedGiftCard,
                    ]}
                  >
                    <Ionicons
                      name={card.icon}
                      size={38}
                      color={card.foreground}
                    />

                    <Text
                      style={[
                        styles.giftCardMessage,
                        { color: card.foreground },
                      ]}
                    >
                      {card.message}
                    </Text>

                    <Text
                      style={[styles.giftCardBrand, { color: card.foreground }]}
                    >
                      COFFEE GIFT
                    </Text>
                  </View>

                  <View style={styles.cardLabelRow}>
                    <Text style={styles.cardLabel}>{card.title}</Text>

                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#006241"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* AMOUNT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose an amount</Text>

          <View style={styles.amountRow}>
            {amounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && styles.selectedAmountButton,
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text
                  style={[
                    styles.amountText,
                    selectedAmount === amount && styles.selectedAmountText,
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* RECIPIENT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalize your gift</Text>

          <Text style={styles.inputLabel}>Recipient's name</Text>

          <TextInput
            style={styles.input}
            placeholder="Who is this gift for?"
            placeholderTextColor="#999999"
            value={recipientName}
            onChangeText={setRecipientName}
          />

          <Text style={styles.inputLabel}>From</Text>

          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#999999"
            value={senderName}
            onChangeText={setSenderName}
          />

          <Text style={styles.inputLabel}>Personal message</Text>

          <TextInput
            style={styles.messageInput}
            placeholder="Write something sweet..."
            placeholderTextColor="#999999"
            value={giftMessage}
            onChangeText={setGiftMessage}
            multiline
            maxLength={200}
            textAlignVertical="top"
          />

          <Text style={styles.characterCount}>{giftMessage.length}/200</Text>
        </View>

        {/* DEMO NOTICE */}
        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color="#006241"
          />

          <Text style={styles.noticeText}>
            This is a demo gift card creator for Assignment 2. No real gift
            cards, payments, or messages will be sent.
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Gift amount</Text>

          <Text style={styles.totalValue}>${selectedAmount.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
          <Text style={styles.previewButtonText}>Preview Gift</Text>

          <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* PREVIEW MODAL */}
      <Modal
        visible={previewVisible}
        animationType="slide"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Gift Preview</Text>

              <TouchableOpacity onPress={() => setPreviewVisible(false)}>
                <Ionicons name="close" size={27} color="#222222" />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.previewCard,
                {
                  backgroundColor: selectedCard.background,
                },
              ]}
            >
              <Ionicons
                name={selectedCard.icon}
                size={70}
                color={selectedCard.foreground}
              />

              <Text
                style={[
                  styles.previewCardMessage,
                  {
                    color: selectedCard.foreground,
                  },
                ]}
              >
                {selectedCard.message}
              </Text>

              <Text
                style={[
                  styles.previewBrand,
                  {
                    color: selectedCard.foreground,
                  },
                ]}
              >
                COFFEE GIFT
              </Text>
            </View>

            <View style={styles.previewDetails}>
              <Text style={styles.previewAmount}>
                ${selectedAmount.toFixed(2)}
              </Text>

              <Text style={styles.previewDetail}>To: {recipientName}</Text>

              <Text style={styles.previewDetail}>From: {senderName}</Text>

              {giftMessage.trim() !== "" && (
                <View style={styles.messagePreview}>
                  <Text style={styles.previewMessage}>"{giftMessage}"</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSendDemo}
            >
              <Text style={styles.confirmButtonText}>Finish Demo</Text>
            </TouchableOpacity>

            <Text style={styles.previewNotice}>
              No real gift card will be sent.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    paddingTop: 65,
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#222222",
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#777777",
    marginTop: 6,
  },

  hero: {
    backgroundColor: "#1E3932",
    paddingHorizontal: 28,
    paddingVertical: 35,
    alignItems: "center",
  },

  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#34564A",
    alignItems: "center",
    justifyContent: "center",
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  },

  heroDescription: {
    fontSize: 15,
    color: "#E1EBE5",
    textAlign: "center",
    lineHeight: 23,
    marginTop: 12,
  },

  section: {
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 9,
  },

  sectionDescription: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 20,
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardOption: {
    width: "48%",
    marginBottom: 22,
  },

  giftCard: {
    width: "100%",
    aspectRatio: 1.55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },

  selectedGiftCard: {
    borderWidth: 3,
    borderColor: "#006241",
  },

  giftCardMessage: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  giftCardBrand: {
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 12,
  },

  cardLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
  },

  amountRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  amountButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: "#CCCCCC",
    borderRadius: 14,
    alignItems: "center",
  },

  selectedAmountButton: {
    borderColor: "#006241",
    backgroundColor: "#E8F0E8",
  },

  amountText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#555555",
  },

  selectedAmountText: {
    color: "#006241",
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
    marginTop: 18,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: "#222222",
  },

  messageInput: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    padding: 16,
    minHeight: 110,
    fontSize: 15,
    color: "#222222",
  },

  characterCount: {
    fontSize: 12,
    color: "#999999",
    textAlign: "right",
    marginTop: 7,
  },

  notice: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F0F6F1",
    marginHorizontal: 22,
    marginTop: 30,
    padding: 15,
    borderRadius: 12,
  },

  noticeText: {
    flex: 1,
    fontSize: 12,
    color: "#426258",
    lineHeight: 19,
  },

  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 13,
    color: "#777777",
  },

  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222222",
    marginTop: 4,
  },

  previewButton: {
    backgroundColor: "#006241",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  previewButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  modalScroll: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },

  modalHeader: {
    paddingTop: 65,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#222222",
  },

  previewCard: {
    width: "100%",
    aspectRatio: 1.55,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  previewCardMessage: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },

  previewBrand: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 3,
    marginTop: 20,
  },

  previewDetails: {
    alignItems: "center",
    paddingVertical: 28,
  },

  previewAmount: {
    fontSize: 34,
    fontWeight: "800",
    color: "#006241",
    marginBottom: 20,
  },

  previewDetail: {
    fontSize: 17,
    color: "#333333",
    marginBottom: 10,
  },

  messagePreview: {
    backgroundColor: "#F8F5EE",
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    width: "100%",
  },

  previewMessage: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555555",
    textAlign: "center",
    lineHeight: 24,
  },

  confirmButton: {
    backgroundColor: "#006241",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  previewNotice: {
    fontSize: 12,
    color: "#888888",
    textAlign: "center",
    marginTop: 15,
  },
});
