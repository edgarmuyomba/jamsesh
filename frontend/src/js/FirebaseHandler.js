import { initializeApp, } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default (function () {

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);

    const storage = getStorage();

    const getStreamUrl = async (url) => {
        const storageRef = ref(storage, url);

        let downloadUrl = await getDownloadURL(storageRef);

        return downloadUrl;
    }

    return {
        getStreamUrl
    }

})();

