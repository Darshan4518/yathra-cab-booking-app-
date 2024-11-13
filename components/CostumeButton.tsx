import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");

const CostumeButton = ({
  title,
  onClick,
  className,
}: {
  title: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className={`bg-[#2F74FA] shadow-md shadow-gray-600 rounded-full my-3 flex justify-center items-center ${className}`}
      style={{ height: height * 0.07 }}
    >
      <Text className=" capitalize text-white font-bold text-xl">{title}</Text>
    </TouchableOpacity>
  );
};

export default CostumeButton;
