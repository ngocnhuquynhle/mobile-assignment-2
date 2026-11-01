import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#006241",
        tabBarInactiveTintColor: "#808080",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 85,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#006241" : "#808080"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "qr-code" : "qr-code-outline"}
              size={24}
              color={focused ? "#006241" : "#808080"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "cafe" : "cafe-outline"}
              size={24}
              color={focused ? "#006241" : "#808080"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="gifts"
        options={{
          title: "Gift",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "gift" : "gift-outline"}
              size={24}
              color={focused ? "#006241" : "#808080"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={24}
              color={focused ? "#006241" : "#808080"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
