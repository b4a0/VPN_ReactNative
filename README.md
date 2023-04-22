# Open Source VPN
## Description
Open Source VPN is a free and open source mobile application that allows users to connect to a VPN using the OpenVPN protocol. The application collects data about working with servers and, based on this, gives the user only the best servers. Non-working servers are automatically deleted by the application. Also, the server database is auto-generated, and when new .ovpn files are added, new servers will be added to the application
 
### Tech Stack
-  React Native 
-  Redux
-  Typescript
-  Firebase

### Website
https://vpn.llill.xyz/
### Google Play Store
 <a href="https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.opensource" target="_blank">
    <img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png' width="320" />
  </a>

## Getting Started
### 1. Add and setup firebase to project
#### 1. Include firebase to project 
For this: 
1. Register app on firebase for web

Add web app's Firebase configuration to src/api/firebase/config.ts:

```JavaScript
const firebaseConfig = {
    apiKey: "AIzaSyAKsIl5UdCMghM9OgaTw14iCBuFSNilYk4",
    authDomain: "todos-d70a6.firebaseapp.com",
    projectId: "todos-d70a6",
    storageBucket: "todos-d70a6.appspot.com",
    messagingSenderId: "811053328343",
    appId: "1:811053328343:web:c74accaddf3e1bdd9f4d92"
};
```

#### 2. Add data to firebase
##### 1. In firestore
1. Create collection 'feedback' to get feedback
2. Create collection 'data' and add document 'serversWithCountries', in this document add field 'servers', Example:
This is main collection where information about servers is stored
```JavaScript
servers:[]
```

3.Create collection 'settings' and add document 'check', in this document add field 'lastCheckTime' with type timestamp<br>

Since the application must dynamically add and remove servers, depending on the .ovpn files, for optimization, the application checks files once a day and stores the date of the last check in the check document of this collection
##### 2. In storage
Create a folder with the name of the country code(in upper case) you want to add, then place there files .ovpn

List of addable countries located in './hooks/languages.ts':
```JavaScript
countries: {
            AE: {
                ru: "Объединенные Арабские Эмираты",
                ua: "Об'єднані Арабські Емірати",
                gb: "United Arab Emirates"
            },
            AR: {
                ru: "Аргентина",
                ua: "Аргентина",
                gb: "Argentina"
            },
            AU: {
                ru: "Австралия",
                ua: "Австралія",
                gb: "Australia"
            },
            ...
}
```

###### You can add a country only if it is included in this list!
### 2. Install modules and run

```JavaScript
npm install
npm start
npx react-native run-android
```