import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { images } from "@/constant/images";

const { width, height } = Dimensions.get("window");
const Onboarding1 = () => {
  return (
    <View className=" flex-col  items-center justify-center  flex-1">
      <View className=" w-full h-[60%]">
        <Image
          source={images.Onboarding1Image}
          style={{ height: height * 0.4 }}
          className=" w-full "
          resizeMode="stretch"
        />
      </View>
      <View className=" max-w-[80%] my-4 ">
        <Text className=" text-4xl font-bold text-center">
          The best car in your hands with
          <Text className=" text-blue-600">Yathra</Text>
        </Text>
        <Text className=" font-bold text-xl text-gray-400 text-center my-2">
          Discover the convenience of finding your perfect ride with our Ryde
          App
        </Text>
      </View>
    </View>
  );
};

export default Onboarding1;
