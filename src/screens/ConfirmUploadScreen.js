import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";

import { SafeAreaView, Text, View } from "react-native";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Button from "../components/Button";
import Logo from "../components/Logo";
import MediumText from "../components/Text/MediumText";
import SmallText from "../components/Text/SmallText";
import FirebaseContxt from "../context/FirebaseContext";

const ConfirmUploadScreen = () => {

    const navigation = useNavigation();
    const { type, title, id } = useRoute().params;

    const { deletePost, fetchOrRefreshItemlist , fetchAllItem} = useContext(FirebaseContxt);

    const [sentence, setSentence] = useState('')
    const [loading, setLoading] = useState(false);

    const [deleted, setDeleted] = useState(false);

    useEffect(() => {

        if (type === 'lost') {
            setSentence('Sorry for your loss.We hope that your ' + title + ' will be found soon.');
        } else if (type === 'found') {
            setSentence('Thank you for sharing information about ' + title + '.' + 'You will be contacted when someone is there to claim.')
        } else if (type == 'delete') {
            setSentence('Are you sure to delete the post?')
        }

    }, [])

    return (
        <SafeAreaView style={{
            // paddingTop: 10,
            height : '100%',
        }}>
            <Logo />
            <View style={{
                flex : 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                }}>
                    {
                        type !== 'delete' &&
                        <MaterialIcons
                            name={'cloud-done'}
                            size={100}
                            color={'#8CC63F'}
                        />
                    }

                    <Text style={{
                        color: 'white',
                        fontWeight: 600,
                        letterSpacing: 2,
                        fontSize: 14,
                    }}>
                        {sentence}
                    </Text>
                </View>

                <View style={{
                    gap: 10,
                    height : 48,
                    flexDirection : 'row',  
                    width: '100%',
                    paddingHorizontal: 4,
                }}>
                    {
                        type === 'delete' ?

                            (
                                deleted === false ?

                                    <>
                                        <Button loading={loading} text={'Yes'} onPress={async () => {
                                            if(loading === true) return;

                                            setLoading(true);
                                            try {
                                                await deletePost(id);
                                                await fetchAllItem( undefined , 'yourpost');
                                                console.log("Deleted");
                                                setDeleted(true);
                                                setSentence("You successfully deleted the post.");
                                            } catch (e) {
                                                console.log("Error >> ", e);
                                            }
                                            setLoading(false);
                                        }} />

                                        <Button outline={true} text={'No'} onPress={() => {
                                            navigation.navigate('seeallitem', { type: 'yourpost' });
                                        }}/>

                                    </> :

                                    <Button outline={false} text={'Go Back'} onPress={() => {
                                        navigation.navigate('seeallitem', { type: 'yourpost'});
                                    }} />

                            )

                            :

                            <Button outline={false} text={'Go Back'} onPress={() => {
                                navigation.navigate('Home');
                            }} />
                    }

                </View>
            </View>
        </SafeAreaView>
    )
}

export default ConfirmUploadScreen;