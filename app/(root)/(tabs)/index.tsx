import React, { lazy, Suspense } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeComonent = lazy(() => import("@/components/HomeComonent"));

const Home = () => {
  return (
    <SafeAreaView className=" flex-1 bg-[#F6F8FA] p-3">
      <Suspense
        fallback={
          <View>
            <ActivityIndicator size={"large"} />
          </View>
        }
      >
        <HomeComonent />
      </Suspense>
    </SafeAreaView>
  );
};

export default Home;
