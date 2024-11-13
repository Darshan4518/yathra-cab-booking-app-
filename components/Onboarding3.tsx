import { View, Text, Image, Dimensions, ImageBackground } from "react-native";
import React from "react";
import { images } from "@/constant/images";

const { width, height } = Dimensions.get("window");
const Onboarding3 = () => {
  return (
    <View className=" flex-col items-center justify-evenly gap-4 flex-1">
      <ImageBackground source={images.carBg} className=" w-full h-[50%]">
        <Image
          source={images.car}
          style={{ height: height * 0.4 }}
          className=" w-full "
          resizeMode="stretch"
        />
      </ImageBackground>

      <View className=" max-w-[80%] my-4">
        <Text className=" text-4xl font-bold text-center">
          Your ride, your way. Let's get started!
        </Text>
        <Text className=" font-bold text-xl text-gray-400 text-center my-2">
          Enter your destination, sit back, and let us take care of the rest.
        </Text>
      </View>
    </View>
  );
};

export default Onboarding3;
