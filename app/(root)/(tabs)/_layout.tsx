import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { View } from "react-native";

const TabIcon = ({ name, focused }: { name: any; focused: boolean }) => {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${
        focused ? "bg-green-300" : ""
      }`}
    >
      <View
        className={`flex h-12 w-12 flex-row justify-center items-center rounded-full ${
          focused ? "bg-green-400" : ""
        }`}
      >
        <MaterialCommunityIcons name={name} size={28} color="white" />
      </View>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderTopWidth: 0,
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="home-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="history" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="chat-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="account-outline" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
