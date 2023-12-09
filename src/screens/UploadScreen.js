import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import Logo from '../components/Logo'
import SmallText from '../components/Text/SmallText'
import AddItemScreen from './AddItemScreen'

const UploadScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{
      height: '100%',
      width: '100%',
      // paddingTop : 10,
      // paddingHorizontal: 6,
    }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20,
        }}>
        <Logo />

        <View style={{ gap: 10, paddingHorizontal: 6, }}>
          <View style={{
            flexDirection: 'row',
            gap: 2,
          }}>
            <SmallText color={'#888888'} text={'1. '} />
            <SmallText color={'#888888'} text={'Upload the Image realted to item lost or found.'} />
          </View>

          <View style={{
            flexDirection: 'row',
            gap: 2,
          }}>
            <SmallText color={'#888888'} text={'2. '} />
            <SmallText color={'#888888'} text={'Write the title or product name.'} />
          </View>

          <View style={{
            flexDirection: 'row',
            gap: 2,
          }}>
            <SmallText color={'#888888'} text={'3. '} />
            <SmallText color={'#888888'} text={'Write a short description about the product describing the features and where you found it.'} />
          </View>

          <View style={{
            flexDirection: 'row',
            gap: 2,
          }}>
            <SmallText color={'#888888'} text={'4. '} />
            <SmallText color={'#888888'} text={'Write the color of the product and location where it was lost or found.'} />
          </View>

          <View style={{
            flexDirection: 'row',
            gap: 2,
          }}>
            <SmallText color={'#888888'} text={'5. '} />
            <SmallText color={'#888888'} text={'Add a tag to get the product quickly.'} />
          </View>

          <View style={{
            flexDirection: 'row',
            gap: 2,
          }}>
            <SmallText color={'#888888'} text={'6. '} />
            <SmallText color={'#888888'} text={'Do not forget to add the contact number.'} />
          </View>

        </View>

        <AddItemScreen />

        {/* <View style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 10,
        }}>
          <Button icon={'cloud-upload'} text='Lost Something ?' onPress={() => {
            navigation.navigate('additem', { type: 'lost' })
          }} />
          <Button icon={'cloud-upload'} outline={true} text='Found Something ?' onPress={() => {
            navigation.navigate('additem', { type: 'found' })
          }} />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UploadScreen