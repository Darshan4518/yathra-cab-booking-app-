import { create } from "zustand";

const useUserLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }),
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }),
}));
