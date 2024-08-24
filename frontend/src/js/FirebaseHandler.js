import { initializeApp,  } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default (function () {

    const firebaseConfig = {
        apiKey: "AIzaSyBfS_-UOcPEB9R1hwHaAjOCOjih8AyxOQA",
        authDomain: "jamsesh-42c22.firebaseapp.com",
        projectId: "jamsesh-42c22",
        storageBucket: "jamsesh-42c22.appspot.com",
        messagingSenderId: "90005077742",
        appId: "1:90005077742:web:94676b921d082e8dedfdff"
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

