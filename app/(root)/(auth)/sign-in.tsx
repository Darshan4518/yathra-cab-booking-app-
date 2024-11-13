import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constant/images";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useRouter } from "expo-router";
import GoogleLoginBtn from "@/components/GoogleLoginBtn";
import { useSignIn } from "@clerk/clerk-expo";
import CostumeButton from "@/components/CostumeButton";

const { height } = Dimensions.get("window");

const inputHeight = height * 0.06;

interface InputBox {
  label: keyof typeof initialFormState;
  placeholder: string;
  icon: any;
}

const inputBoxes: InputBox[] = [
  {
    label: "email",
    placeholder: "Enter your Email",
    icon: "email-outline",
  },
  {
    label: "password",
    placeholder: "Enter your Password",
    icon: "security",
  },
];

const initialFormState = {
  email: "",
  password: "",
};

const Signin = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error("Sign-In Incomplete:", JSON.stringify(signInAttempt));
      }
    } catch (err) {
      console.error("Sign-In Error:", JSON.stringify(err));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Image and Welcome Text */}
      <View className="relative">
        <Image
          source={images.authcarImg}
          className="w-full"
          style={{ height: height * 0.26 }}
        />
        <Text className="absolute bottom-4 left-3 text-3xl font-bold text-gray-800">
          Welcome 👋
        </Text>
      </View>

      {/* Input Fields */}
      <View className="p-3 my-3">
        {inputBoxes.map((item, index) => (
          <View key={index} className="mb-4">
            <Text className="text-2xl font-medium">{item.label}</Text>
            <View
              className="flex-row items-center bg-[#F6F8FA] px-4"
              style={{
                height: inputHeight,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 50,
              }}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color="black"
              />
              <TextInput
                placeholder={item.placeholder}
                className="flex-1 h-full text-xl"
                onChangeText={(value) => handleInputChange(item.label, value)}
                secureTextEntry={item.label === "password"}
                autoCapitalize="none"
              />
            </View>
          </View>
        ))}
      </View>

      <View className="w-full flex-col items-center">
        <CostumeButton
          title="Sign In"
          className="w-[90%]"
          onClick={onSignInPress}
        />

        <View className="flex-row items-center my-4">
          <View className="flex-1 border-t border-gray-400" />
          <Text className="mx-4 font-bold text-gray-600 text-xl">Or</Text>
          <View className="flex-1 border-t border-gray-400" />
        </View>
        <GoogleLoginBtn />
      </View>

      {/* Navigation to Sign Up */}
      <Text className="text-center my-3 font-bold text-xl text-gray-600">
        Don’t have an account?{" "}
        <Link href="/(auth)/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </Text>
    </ScrollView>
  );
};

export default Signin;
