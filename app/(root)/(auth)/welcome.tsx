import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import Onboarding1 from "@/components/Onboarding1";
import Onboarding2 from "@/components/Onboarding2";
import CostumeButton from "@/components/CostumeButton";
import Onboarding3 from "@/components/Onboarding3";
import { router } from "expo-router";
const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  return (
    <SafeAreaView className=" flex-1 pb-10 items-center justify-evenly p-3">
      <View className=" flex-row justify-end w-full my-4 px-3">
        <TouchableOpacity>
          <Text className=" font-bold text-xl">Skip</Text>
        </TouchableOpacity>
      </View>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsButtons={true}
        nextButton={true}
        onIndexChanged={(index: number) => setSwiperIndex(index)}
        dot={
          <View className=" w-[8vw] bg-gray-300 mx-2 rounded-full h-[0.5vh]" />
        }
        activeDot={
          <View className=" w-[8vw] bg-[##2F74FA] rounded-full h-[0.5vh]" />
        }
      >
        <Onboarding1 />
        <Onboarding2 />
        <Onboarding3 />
      </Swiper>
      <CostumeButton
        title={swiperIndex == 2 ? "get started" : "next"}
        onClick={() =>
          swiperIndex == 2
            ? router.push("/(auth)/login")
            : setSwiperIndex((prev) => prev + 1)
        }
        className=" w-[90%]"
      />
    </SafeAreaView>
  );
};

export default Welcome;
