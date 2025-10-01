import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDFuWdMSSclijWUDrH2ziaScX-r2mo8TXE',
    authDomain: 'just-add-2acd0.firebaseapp.com',
    projectId: 'just-add-2acd0',
    storageBucket: 'just-add-2acd0.firebasestorage.app',
    messagingSenderId: '465800866491',
    appId: '1:465800866491:web:14197129034f836862d79e',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
