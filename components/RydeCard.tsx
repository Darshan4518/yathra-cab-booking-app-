import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Ride } from "@/types/rydes";
import moment from "moment";

const { width, height } = Dimensions.get("window");

const RydeCard = ({ ryde }: { ryde: Ride }) => {
  const {
    driver,
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    payment_status,
    created_at,
    ride_time,
  } = ryde;

  const hours = Math.floor(ride_time / 60);
  const minutes = ride_time % 60;

  // Format the result
  const formattedTime = `${hours}h ${minutes}m`;

  return (
    <View className=" p-3 bg-white/50 m-2 rounded-md">
      <View>
        <View className=" flex-row items-center gap-3">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}
        `,
            }}
            style={{
              width: width * 0.2,
              height: height * 0.1,
            }}
            className="rounded-lg"
          />
          <View>
            <View className=" flex-row items-center gap-2">
              <FontAwesome name="location-arrow" size={26} color="black" />
              <Text className=" text-xl" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>
            <View className=" flex-row items-center my-3 gap-2">
              <Ionicons name="location-outline" size={24} color="black" />
              <Text className=" text-xl " numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className=" bg-[#F6F8FA] p-3 my-3 rounded-md">
          <View className=" flex-row justify-between items-center p-3 ">
            <Text className=" text-xl font-medium">Date & Time</Text>
            <Text className=" text-base ">
              {moment(created_at).format("MMM DD, YYYY")}, {formattedTime}
            </Text>
          </View>
          <View className=" flex-row justify-between items-center p-3 ">
            <Text className=" text-xl font-medium">Driver</Text>
            <Text className=" text-xl">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          <View className=" flex-row justify-between items-center p-3">
            <Text className=" text-xl font-medium">Carseats</Text>
            <Text className=" text-xl">{driver.car_seats}</Text>
          </View>
          <View className=" flex-row justify-between items-center p-3 ">
            <Text className=" text-xl font-medium">Payment Status</Text>
            <Text className=" text-xl text-green-500">{payment_status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RydeCard;
