import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  RecaptchaVerifier,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  initializeAuth,
} from 'firebase/auth'
import { envService } from '../services/EnvService'

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
  }
}

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export class FirebaseAuth {
  private static instance: FirebaseAuth | null = null

  private firebase: FirebaseApp

  public auth: Auth

  constructor(config: FirebaseConfig) {
    if (FirebaseAuth.instance) {
      throw new Error(
        'Error: Instantiation failed: Use FirebaseAuth.getInstance() instead of new.',
      )
    }

    this.firebase = initializeApp(config)
    this.auth = initializeAuth(this.firebase, {
      persistence: browserLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    })
  }

  static getInstance() {
    if (!FirebaseAuth.instance) {
      const env = envService.getEnv()

      const firebaseConfig: FirebaseConfig = {
        apiKey: env.FIREBASE_API_KEY,
        authDomain: env.FIREBASE_AUTH_DOMAIN,
        projectId: env.FIREBASE_PROJECT_ID,
        storageBucket: env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
        appId: env.FIREBASE_APP_ID,
      }

      FirebaseAuth.instance = new FirebaseAuth(firebaseConfig)
    }

    return FirebaseAuth.instance
  }
}
