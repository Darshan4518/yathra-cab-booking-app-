import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import CostumeButton from "@/components/CostumeButton";
import GoogleLoginBtn from "@/components/GoogleLoginBtn";
import { images } from "@/constant/images";
import { postApi } from "@/lib/fetch";

const { height } = Dimensions.get("window");

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: any;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) => (
  <View className="mb-4">
    <Text className="text-2xl font-medium">{label}</Text>
    <View
      className="flex-row items-center gap-2 bg-[#F6F8FA] px-4 my-2"
      style={{
        height: height * 0.06,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 50,
      }}
    >
      <MaterialCommunityIcons name={icon} size={24} color="black" />
      <TextInput
        className="flex-1 h-full text-xl"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };


  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress:form.email,
        password:form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code:verification.code,
      })

      if (completeSignUp.status === 'complete') {
        await postApi("/(api)/user", {
                  method: "POST",
                  body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    clerkId: completeSignUp.createdUserId,
                  }),
                });
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({ ...verification, state: "success" });
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative">
        <Image
          source={images.authcarImg}
          className="w-full"
          style={{ height: height * 0.26 }}
        />
        <Text className="absolute bottom-3 left-3 text-3xl font-bold text-gray-800">
          Create Your Account
        </Text>
      </View>
      <View className="p-3 my-3">
        <InputField
          label="Name"
          placeholder="Enter your name"
          icon="account-outline"
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon="email-outline"
          value={form.email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          icon="security"
          value={form.password}
          onChangeText={(value) => handleInputChange("password", value)}
          secureTextEntry
        />
      </View>

      <View className="w-full flex-col items-center">
        <CostumeButton
          title="Sign Up"
          className="w-[90%]"
          onClick={onSignUpPress}
        />
        <View className="flex-row items-center gap-2">
          <View className="w-[30vw] border-t border-gray-800" />
          <Text className="my-3 font-bold text-2xl text-gray-600">Or</Text>
          <View className="w-[30vw] border-t border-gray-800" />
        </View>
        <GoogleLoginBtn />
      </View>

      <Text className="text-center my-3 font-bold text-xl text-gray-600">
        Already have an account?{" "}
        <Link href="/(auth)/sign-in" className="text-blue-500">
          Log in
        </Link>
      </Text>

      {/* Email verification  */}

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() =>{
          if( verification.state === "success"){
            setShowSuccessModal(true)
          }
        }}
      >
        <View
          className="bg-white px-8 p-4 rounded-2xl"
          style={{
            minHeight: height * 0.3,
          }}
        >
          <Text className="text-3xl font-bold my-1">Verification</Text>
          <Text className="text-xl font-bold text-gray-700">
            We've sent a verification code to your email.
          </Text>
          <InputField
            label="Code"
            placeholder="Enter code"
            icon="lock-outline"
            value={verification.code}
            onChangeText={(value) =>
              setVerification({ ...verification, code: value })
            }
            keyboardType="numeric"
          />
          {verification.error && (
            <Text className="text-red-500 text-base text-center mt-2 font-semibold">
              {verification.error}
            </Text>
          )}
          <CostumeButton
            title="Verify Email"
            onClick={onPressVerify}
            className="bg-green-500"
          />
        </View>
      </ReactNativeModal>

      {/* Success Modal */}
      <ReactNativeModal isVisible={showSuccessModal} onModalHide={()=>{
        setShowSuccessModal(false)
      }}>
        <View
          className="bg-white px-8 p-4 rounded-2xl flex-col items-center"
          style={{
            minHeight: height * 0.4,
          }}
        >
          <Image
            source={images.success}
            style={{
              height: height * 0.2,
            }}
          />
          <Text className="text-3xl font-bold my-3">Verified!</Text>
          <Text className="text-xl font-bold text-gray-700 text-center my-3">
            Your account has been successfully verified.
          </Text>
          <CostumeButton
            title="Browse Home"
            onClick={() => router.push("/(root)/(tabs)/")}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default Signup;
