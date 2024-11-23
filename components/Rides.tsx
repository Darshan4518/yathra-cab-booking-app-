import { FlatList } from 'react-native'
import React from 'react'
import { recentRides } from '@/constant/ridesData'
import RydeCard from './RydeCard'

const Rides = () => {
  return (
    <FlatList data={recentRides} renderItem={({item})=>(
        <RydeCard ryde={item}/>
       )}
       keyboardShouldPersistTaps="handled"
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{paddingBottom: 100}}
       />
  )
}

export default Rides