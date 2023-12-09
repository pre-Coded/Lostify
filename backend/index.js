const { default: axios } = require('axios');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json');
const cloudinary = require('cloudinary').v2;
const multer = require('multer')

// cloudinary.config({
//   cloud_name: 'dywg3wtoa',
//   api_key: '775924319595144',
//   api_secret: 'vHbspoIT3tXIj2M-EXCViDDvnoI',
// });

// const uploadProfile = async (req, res) => {
//   try {

//     const result = await cloudinary.uploader.upload(req.file.path, {
//       public_id: `${Date.now()}_profile`,
//       crop: 'fill',
//     });

//     console.log("success");

//     res
//       .status(201)
//       .json({ success: true, message: 'Your Image is Uploaded!', url: result.url });

//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: 'server error, try after some time' });
//     console.log('Error while uploading profile image', error.message);
//   }
// };

// const storage = multer.diskStorage({});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb('invalid image file!', false);
//   }
// };

// const uploads = multer({ dest: 'uploads/', storage, fileFilter });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(cors());

// restricting user 


// const sendMsg = async () => {
//   try {
//     await axios.get('https://lostify-backend.onrender.com/send-notification');
//   } catch (e) {
//     console.log("error", e);
//   }

// }

// let lastTimeStamp = Date.now();
// var title;
// var body;
// var data;

// admin.firestore().collection('Notification').where('timeStamp', '>', lastTimeStamp).onSnapshot((snap) => {
//   snap.docChanges().forEach((change, index) => {
//     if (change.type === 'modified') {
//       console.log('Document modified: ', change.doc.data().data);
//     }

//     if (change.type === 'removed') {
//       console.log('Document removed: ', change.doc.data().data);
//     }

//     if (change.type === 'added') {
//       console.log('New document added: Type', change.doc.data());

//       title = change.doc.data().title;
//       body = change.doc.data().body;

//       data = {
//         ...change.doc.data()
//       }


//       sendMsg();
//     }
//   })

// }, (error) => {
//   console.log("Error in listening", error);
// })

// app.get('/send-notification', async (req, res) => {

//   let tokenList;
//   try {
//     const res = await admin.firestore().collection('Token').doc('jRj5mDbeJ27Wnn50rP0L').get();
//     tokenList = res.data().token;
//   } catch (e) {
//     console.log("Error in tokenList >> ", e);
//   }

//   if (tokenList.length <= 0) {
//     res.send("HI, Token List is empty.");
//   }

//   const messages = tokenList.map(token => ({
//     notification: {
//       title: title,
//       body: body,
//     },
//     data: {
//       data: JSON.stringify({
//         data: data,
//         notifee: {
//           title: title,
//           body: body,
//         },
//       })
//     },
//     token: token,
//   }));

//   admin.messaging().sendEach(messages)
//     .then(response => {
//       console.log('Successfully sent messages:', response);
//       res.status(200).send('Notifications sent successfully');
//     })
//     .catch(error => {
//       console.error('Error sending messages:', error);
//       res.status(500).send('Error sending notifications');
//     });
// });


// app.post(
//   '/upload-img',
//   uploads.single('profile'),
//   uploadProfile
// );

// app.get(
//   '/upload-img',
//   async (req, res) => {
//     res.send("hi");
//   }
// );





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
