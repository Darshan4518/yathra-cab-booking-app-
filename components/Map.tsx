import { Dimensions, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const { height } = Dimensions.get("window");
const Map = () => {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{
        height: height * 0.4,
        width: "100%",
      }}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
