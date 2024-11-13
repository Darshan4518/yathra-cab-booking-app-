import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { images } from "@/constant/images";

const { width, height } = Dimensions.get("window");
const GoogleLoginBtn = () => {
  return (
    <TouchableOpacity
      className="bg-white border border-gray-300 shadow-md shadow-gray-400 rounded-full w-[90%] my-3 flex-row gap-4 justify-center items-center"
      style={{ height: height * 0.07 }}
    >
      <Image
        source={images.googleImg}
        style={{ width: width * 0.07, height: height * 0.03 }}
        resizeMode="stretch"
      />
      <Text className=" font-semibold text-xl">Login with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginBtn;
