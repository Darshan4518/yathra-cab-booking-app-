import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import { images } from "@/constant/images";
import CostumeButton from "@/components/CostumeButton";
import GoogleLoginBtn from "@/components/GoogleLoginBtn";
import { Link, router } from "expo-router";

const { height } = Dimensions.get("window");
const LoginOption = () => {
  return (
    <ScrollView className=" flex-1 bg-white">
      <StatusBar />
      <Image
        source={images.authcarImg}
        className=" w-full"
        resizeMode="stretch"
        style={{ height: height * 0.5 }}
      />
      <View className=" my-3">
        <View className="">
          <Text className=" text-center text-4xl font-bold">
            Let’s get started
          </Text>
          <Text className=" text-center font-semibold text-xl my-2 max-w-[60vw] mx-auto text-gray-600">
            Sign up or log in to find out the best car for you
          </Text>
        </View>
        <View className="w-full flex-col items-center">
          <CostumeButton
            title="Signup"
            className=" w-[90%]"
            onClick={() => router.replace("/(auth)/sign-up")}
          />
          <View className=" flex-row items-center gap-2">
            <View className=" w-[30vw] border-t border-gray-800 " />
            <Text className=" my-3 font-bold text-2xl text-gray-600">Or</Text>
            <View className=" w-[30vw] border-t border-gray-800 " />
          </View>
          <GoogleLoginBtn />
        </View>

        <Text className=" text-center my-3 font-bold text-xl text-gray-600">
          Don’t have an account?
          <Link href={"/(auth)/sign-in"} className=" text-blue-500">
            Log in
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginOption;
