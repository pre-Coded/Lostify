import React, { createContext, useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore, { Filter } from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';

import notifee, { EventType } from '@notifee/react-native';

import { PermissionsAndroid, Alert } from 'react-native';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from "axios";

const FirebaseContxt = createContext();

export default FirebaseContxt;


export const FirebaseProvider = ({ children }) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    // const [allItem, setAllItem] = useState([]);
    const [lostItem, setLostItem] = useState([]);
    const [foundItem, setFoundItem] = useState([]);

    const [notification, setNotification] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const [username, setUsername] = useState(null);

    const onAuthStateChanged = async (user) => {
        try {
            const ref = firestore().collection('Users');

            const email = user.email;
            const res = await ref.where('email', '==', email).get();

            res.forEach(doc => {
                setUsername(doc.data());
            })

            console.log("username ", username);
        } catch (e) {
            console.log(e);
        }

        setUser(user);
        setInitializing(false);
    }

    async function requestUserPermission() {
        const authStatus = Platform.OS === 'ios' ? await messaging().requestPermission() : PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        var token;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        }

        token = await messaging().getToken();

        try {
            await firestore().collection('Token').doc('jRj5mDbeJ27Wnn50rP0L').update({
                token: firestore.FieldValue.arrayUnion(token)
            })
        } catch (error) {
            console.log(error);
        }

        console.log({ token });
    }

    const fetchNotification = async () => {
        try {
            if (user) {
                const ref = await firestore().collection('Notification').where('timeStamp', '>', username.joiningTimestamp).get();
                const notifications = [];

                ref.forEach((doc) => {
                    notifications.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setNotification(notifications);
            }
        } catch (e) {
            console.log("Error >> ", e);
        }
    };

    useEffect(() => {
        fetchNotification();
    }, [user])

    async function onDisplayNotification(title, body) {
        await notifee.requestPermission()

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    async function onMessageReceived(message) {
        const res = JSON.parse(message.data.data);

        setUnreadCount(prev => prev++);
        setNotification((prev) => ({
            ...prev, ...res.data
        }))

        console.log("NOtifee >> ", res);

        const title = res.notifee.title;
        const body = res.notifee.body;
        await onDisplayNotification(title, body);
    }

    // notifee.onBackgroundEvent(async (message) => {
    //     console.log("Message tapped on Background.");
    // });
    // messaging().setBackgroundMessageHandler(onMessageReceived);

    useEffect(() => {
        const subNotification = messaging().onMessage(onMessageReceived);

        const subBackNotification = () => {
            messaging().setBackgroundMessageHandler(onMessageReceived);
            notifee.onBackgroundEvent(async (message) => {
                console.log("Message tapped on Background.");
            });
        }
        
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return () => {
            subscriber();
            subNotification();
            subBackNotification();
        };
    }, []);

    const googleSignIn = async () => {

        try {

            GoogleSignin.configure({
                offlineAccess: false,
                webClientId: '1035469091979-v9o4bse21qm1ab7bsrm1gm01ume8cjdc.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                hostedDomain: 'nitj.ac.in',
            });

            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const userInfo = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            auth().signInWithCredential(googleCredential);

            const isGoogleSignedIn = await GoogleSignin.isSignedIn();

            if (isGoogleSignedIn) setUser({ userInfo });
            else setUser(null);

            // setUser({ userInfo });

            const ref = firestore().collection('Users');

            const email = userInfo.user.email;
            const username = userInfo.user.name;
            const profilePhoto = userInfo.user.photo;

            const querySnapshot = await ref.where('email', '==', email).get();

            if (querySnapshot.size <= 0) {
                await ref.add({
                    email: email,
                    username: username,
                    profilePhoto,
                    joiningTimestamp: Date.now(),
                }).then((e) => {
                    console.log('Google Sign User Uploaded to firestore successfully.', e)
                }).catch((e) => {
                    console.log("error in uploading user", e);
                })
                console.log('User account created & signed in!');
            }

            return true;

        } catch (error) {

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("First >> ", error);
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Second >> ", error)
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Third >> ", error)
                // play services not available or outdated
            } else {
                console.log("Other >> ", JSON.stringify(error));
                // some other error happened
            }

            setUser(null);

            return false;
        }
    }

    const emailPasswordLogin = async (email, password) => {
        return await auth()
            .signInWithEmailAndPassword(email, password);
    }

    const emailPasswordSignUp = (email, password, username) => {

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async () => {

                const ref = firestore().collection('Users');

                await ref.add({
                    email: email,
                    username: username,
                    profilePhoto: '',
                    joiningTimestamp: Date.now(),
                }).then((e) => {
                    console.log('User Uploaded to firestore successfully.', e)
                }).catch((e) => {
                    console.log("error in uploading user", e);
                })
                console.log('User account created & signed in!');
            })
            .catch(error => {

                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }

    const logOut = async () => {
        try {
            GoogleSignin.configure({
                offlineAccess: false,
                webClientId: '1035469091979-v9o4bse21qm1ab7bsrm1gm01ume8cjdc.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                hostedDomain: '@nitj.ac.in',
            });

            const token = await messaging().getToken();
            await firestore().collection('Token').doc('jRj5mDbeJ27Wnn50rP0L').update({
                token: firestore.FieldValue.arrayRemove(token)
            })

            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth().signOut();
            console.log('User signed out from Google.');
            console.log('removed');
            setUser(null);
            setUsername(null);

        } catch (e) {
            console.log("Error in signing Out", e);
        }
    }

    const resetPassword = async (email) => {
        return await auth().sendPasswordResetEmail(email);
    };

    const uploadImage = async (url) => {

        if (url.length <= 0 || url === null) return

        try {
            const formData = new FormData();

            formData.append('profile', {
                name: 'profile',
                uri: url,
                type: 'image/*',
            });

            console.log("Image >> ", formData.getParts());

            const client = axios.create({ baseURL: 'https://lostify-backend.onrender.com' });

            const res = await client.post('/upload-img', formData, {
                headers: {
                    Accept: 'application/json; charset=utf-8',
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res.data.url);

            const ImageUrl = convertToHttps(res.data.url);

            return ImageUrl;
        } catch (error) {
            console.log("Upload Error", JSON.stringify(error));
        }
    };

    const uploadItem = async (imageURI, data, tag, type) => {
        try {

            var url = '';

            if (imageURI.length > 0) {
                console.log("Inside");
                url = await uploadImage(imageURI);
            }

            const ref = firestore().collection('Lostify');

            tag = tag?.length > 0 || tag !== undefined ? tag : 'None';

            data.color = data.color !== undefined ? data.color : 'Not Mentioned.';
            data.name = data.name !== undefined ? data.name : 'NITJian';
            data.nearby = data.nearby !== undefined ? data.nearby : 'Not Mentioned.';
            data.nearby = data.nearby !== undefined ? data.nearby : 'Not Mentioned.';
            data.desc = data.desc !== undefined ? data.desc : '';

            const result = await ref.add({
                data : data,
                title: data.title,
                url : url,
                status: type === 'lost' ? 'Not Found' : 'Not Claimed',
                tag : tag,
                user: user.email,
                type : type,
                timeStamp: Date.now()
            });


            await firestore().collection('Notification').add({
                title: `${data.name} ${type === 'lost' ? 'lost' : 'found'} ${data.title}`,
                body: data.desc,
                timeStamp: Date.now(),
                type : type,
                id: result.id,
                url: url,
                profilePhoto: username?.profilePhoto,
            })
            

            return true;
        } catch (error) {
            console.error('Error uploading :', error);
            return false;
        }
    }

    const [allItem, setAllItemList] = useState([]);

    const fetchAllItem = async (lastBatch, type) => {
        var limit = 50;
        try {
            let query = firestore().collection('Lostify').orderBy('timeStamp', 'desc');

            if (lastBatch !== undefined) {
                query = query.startAfter(lastBatch);
            }else{
                setAllItemList([]);
            }

            let itemList = [];
            const querySnapshot = await query.limit(limit).get();
            if (!querySnapshot.empty){
                querySnapshot.forEach((doc) => {
                    itemList.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                });

            } else {
                console.log('No more items to fetch.');
                return false;
            }

            setAllItemList((prev) => ([...prev, ...itemList]));

            if(type === 'all') return itemList;

            var filteredItem;

            if (type === 'lost' || type === 'found') {
                filteredItem = itemList.filter(item => item.data.type === type);
            }else if (type === 'yourpost') {
                filteredItem = itemList.filter(item => item.data.user === user?.email);
            } else{
                filteredItem = itemList.filter(item => item.data.tag === type);
            } 

            if(filteredItem.length <= 0) {
                return fetchAllItem(itemList[itemList.length - 1].data.timeStamp, type);
            }

            return filteredItem;
        }catch(e){
            console.log("Error in fetching Batch >> ", e);
        }
    }

    const getLostItem = async (limit) => {
        return await firestore().collection('Lostify').where('type', '==', 'lost').limit(limit).get();
    }

    const getFoundItem = async (limit) => {
        return await firestore().collection('Lostify').where('type', '==', 'found').limit(limit).get();
    }

    const getYourPost = async () => {
        return await firestore().collection('Lostify').where('user', '==', user?.email).get();
    }

    const searchItem = async (query) => {
        return await firestore().collection('Lostify').get();
    }

    const findTime = (timeStamp) => {
        const currentTime = Date.now();
        const pastTime = timeStamp;
        const timeDifference = currentTime - pastTime;
        const secondsPassed = Math.floor(timeDifference / 1000);
        const minutesPassed = Math.floor(secondsPassed / 60);
        const hoursPassed = Math.floor(minutesPassed / 60);
        const daysPassed = Math.floor(hoursPassed / 24);

        if (hoursPassed <= 0) {
            return `${minutesPassed} min`;
        } else if (hoursPassed >= 24) {
            return `${daysPassed} day`;
        }
        else {
            return `${hoursPassed} hour`;
        }
    }

    const getAllIdCard = async () => {
        return await firestore().collection('Lostify').where('tag', '==', 'Id Card').get();
    }

    const getAllBottle = async () => {
        return await firestore().collection('Lostify').where('tag', '==', 'Bottle').get();
    }
    const getAllBag = async () => {
        return await firestore().collection('Lostify').where('tag', '==', 'Bag').get();
    }
    const getAllWatch = async () => {
        return await firestore().collection('Lostify').where('tag', '==', 'Watch').get();
    }
    const getAllUmbrella = async () => {
        return await firestore().collection('Lostify').where('tag', '==', 'Umbrella').get();
    }

    const notificationClick = async (id) => {
        return await firestore().collection('Lostify').doc(id).get();
    }

    const hanleBackNotification = async (details) => {
        setNotification(prev => [...prev, details]);
        setUnreadCount(prev => ++prev);
    }

    // const [item, setItemList] = useState([]);

    const fetchOrRefreshItemlist = async (type) => {
        try {

            let result = [];

            if (type === 'lost') {
                result = await getLostItem(100);
            } else if (type === 'found') {
                result = await getFoundItem(100);
            } else if (type === 'yourpost') {
                result = await getYourPost();
            } else if (type === 'Id Card') {
                result = await getAllIdCard();
            } else if (type === 'Bottle') {
                result = await getAllBottle();
            } else if (type === 'Bag') {
                result = await getAllBag();
            } else if (type === 'Watch') {
                result = await getAllWatch();
            } else if (type === 'Umbrella') {
                result = await getAllUmbrella();
            }

            var itemList = [];

            result.forEach(documentSnapshot => {
                itemList.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data()
                });
            });

            itemList.sort((a, b) => b.data.timeStamp - a.data.timeStamp);

            setItemList(itemList)
        } catch (e) {
            console.log('error', e)
        }
    }

    const deletePost = async (id) => {
        try {
            const ref = await firestore().collection("Lostify").doc(id).delete();
        } catch (e) {
            console("Unable to delete >> ", e);
        }
    }

    const updateUser = async (fieldName, updatedValue) => {
        try {
            const querySnapshot = await firestore().collection('Users').where('email', '==', user.email).get();

            querySnapshot.forEach(async (doc) => {
                const docRef = firestore().collection('Users').doc(doc.id);

                const ref = await docRef.update({
                    profilePhoto: updatedValue,
                })
                    .then((ref) => {
                        console.log('Document successfully updated!', ref);
                        setUsername(prev => ({ ...prev, profilePhoto: updatedValue }))
                    })
                    .catch((error) => {
                        console.error('Error updating document: ', error);
                    });

                console.log(ref);
            });

        } catch (e) {
            console.log("Error in updating Value ", e);
        }
    }

    function convertToHttps(url) {
        if (url.startsWith('http://')) {
            return url.replace('http://', 'https://');
        }
        else if (url.startsWith('https://')) {
            return url;
        }
        else {
            return `https://${url}`;
        }
    }

    return (
        <FirebaseContxt.Provider value={{
            user,
            initializing,
            googleSignIn,
            emailPasswordSignUp,
            emailPasswordLogin,
            logOut,
            uploadItem,
            findTime,
            allItem,
            lostItem,
            foundItem,
            getLostItem,
            getFoundItem,
            username,
            getYourPost,
            resetPassword,
            searchItem,
            getAllIdCard,
            getAllBottle,
            getAllBag,
            getAllWatch,
            getAllUmbrella,
            notification,
            notificationClick,
            requestUserPermission,
            unreadCount,
            hanleBackNotification,
            setUnreadCount,
            deletePost,
            fetchOrRefreshItemlist,
            uploadImage,
            updateUser,
            convertToHttps,
            fetchAllItem
        }}>
            {children}
        </FirebaseContxt.Provider>
    )
}
