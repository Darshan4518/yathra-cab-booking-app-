import { lazy, Suspense } from "react";
import {  ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides=lazy(()=>import("@/components/Rides"))

const rides = () => {
  return (
    <SafeAreaView className=" flex-1 bg-[#F6F8FA] p-2">
      <Text className=" text-3xl font-bold mx-3">History</Text>
      <Suspense fallback={<View>
   <ActivityIndicator size="large" /> 
      </View>}>
        <Rides/>
        </Suspense>      
    </SafeAreaView>
  );
};

export default rides;
