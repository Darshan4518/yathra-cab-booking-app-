import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { recentRides } from "@/constant/ridesData";
import RydeCard from "./RydeCard";
import { useUser } from "@clerk/clerk-expo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Map from "./Map";

const HomeComonent = () => {
  const { user } = useUser();
  return (
    <FlatList
      data={recentRides.slice(0, 5)}
      renderItem={({ item }) => <RydeCard ryde={item} />}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListEmptyComponent={
        <View>
          <Text>No recent Rides</Text>
        </View>
      }
      ListHeaderComponent={
        <View>
          <View className=" flex-row items-center justify-between px-3">
            <Text className=" text-xl font-bold capitalize">
              Welcome ,{" "}
              {user?.firstName ||
                user?.emailAddresses[0].emailAddress.split("@")[0]}
            </Text>
            <TouchableOpacity>
              <SimpleLineIcons name="logout" size={22} color="black" />
            </TouchableOpacity>
          </View>
          <View className=" my-3">
            <Text className=" text-xl font-bold capitalize my-2 text-gray-800">
              Your current location
            </Text>
            <Map />
          </View>
        </View>
      }
    />
  );
};

export default HomeComonent;
