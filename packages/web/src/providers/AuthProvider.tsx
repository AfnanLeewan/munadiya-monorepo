import { AuthAPI } from '@/api/authApi'
import { usePostAPI } from '@/hooks/useAPI'
import {
  ConfirmResetPasswordResponse,
  SendPasswordResetEmailResponse,
  VerifyResetPasswordCodeResponse,
  VerifyTokenResponse,
} from '@/shared/types/auth'
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  IdTokenResult,
  User,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth'
import { pick } from 'lodash'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { Role } from '@/shared/enum/role'
import { FirebaseAuth } from '@/config/firebase'

export type AuthContextType = {
  loggedIn: boolean | undefined
  currentUser: User | null
  roles: string[]
  currentRole: string
  isStudent: boolean
  isTeacher: boolean
  isAdmin: boolean
  teacherId: string
  setTeacherIdValue: (id: string) => void
  hasRoles: (roles: string | string[]) => boolean
  signInWithEmail: (
    email: string,
    password: string,
    persistence?: boolean,
  ) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: ({
    email,
    recaptchaValue,
  }: {
    email: string
    recaptchaValue: string
  }) => Promise<void>
  changePassword: (password: string) => Promise<void>
  verifyPassword: (currentPassword: string) => Promise<void>
  verifyPasswordResetCode: (params: { token: string }) => Promise<void>
  confirmPasswordReset: (params: {
    token: string
    newPassword: string
  }) => Promise<void>
  setCurrentRole: (role: string) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type Props = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const { auth } = FirebaseAuth.getInstance()
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [idTokenResult, setIdTokenResult] = useState<IdTokenResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [teacherId, setTeacherId] = useState('')
  const setTeacherIdValue = (id) => {
    setTeacherId(id)
  }
  const setCurrentRoleCookie = (role: string) => {
    Cookies.set('current-role', role, {
      expires: 7, // days
      sameSite: 'strict',
      secure: false, // todo: concern?
    })
  }

  const removeCurrentRoleCookie = () => {
    Cookies.remove('current-role')
  }

  const userRoles = useMemo(() => {
    if (idTokenResult?.claims.roles && !Cookies.get('current-role')) {
      const currentRole = idTokenResult?.claims.roles[0] // make the first role as current role
      setCurrentRoleCookie(currentRole)
    }
    return (idTokenResult?.claims.roles as string[]) || []
  }, [idTokenResult])

  const setCurrentRole = (role: string) => {
    const existRole = userRoles.find((r) => r === role)
    if (existRole) {
      setCurrentRoleCookie(role)
      window.location.replace('/')
    }
  }

  const { mutateAsync: verifyToken } = usePostAPI<VerifyTokenResponse>(
    AuthAPI.VERIFY_TOKEN,
  )

  const { mutateAsync: resetPassword } =
    usePostAPI<SendPasswordResetEmailResponse>(
      AuthAPI.SEND_RESET_PASSWORD_EMAIL,
    )

  const { mutateAsync: verifyPasswordResetCode } =
    usePostAPI<VerifyResetPasswordCodeResponse>(
      AuthAPI.VERIFY_RESET_PASSWORD_CODE,
    )

  const { mutateAsync: confirmPasswordReset } =
    usePostAPI<ConfirmResetPasswordResponse>(AuthAPI.CONFIRM_RESET_PASSWORD)

  const signOut = useCallback(async () => {
    await auth.signOut()

    setLoggedIn(false)
    localStorage.removeItem('access_token')
    removeCurrentRoleCookie()
  }, [auth])

  const changePassword = async (password: string) => {
    return updatePassword(currentUser!, password)
  }

  const verifyPassword = async (currentPassword: string) => {
    const credential = EmailAuthProvider.credential(
      currentUser?.email || '',
      currentPassword,
    )

    await reauthenticateWithCredential(currentUser!, credential)
  }

  const signInWithEmail = async (
    email: string,
    password: string,
    remember?: boolean,
  ) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      const token = await user.getIdToken(true)
      const { idToken } = await verifyToken({ idToken: token })

      localStorage.setItem('access_token', idToken)

      if (remember) {
        localStorage.setItem(
          'previous_user',
          JSON.stringify(pick(user, 'email', 'displayName')),
        )
      } else {
        localStorage.removeItem('previous_user')
      }

      setLoggedIn(true)
    } catch (error) {
      signOut()

      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()

      // NOTE: this parameter allow user to select google account inteadof previous picked account
      provider.setCustomParameters({
        prompt: 'select_account',
      })

      const { user } = await signInWithPopup(auth, provider)
      const token = await user.getIdToken(true)
      const { idToken } = await verifyToken({ idToken: token })

      localStorage.setItem('access_token', idToken)

      setLoggedIn(true)
    } catch (error) {
      signOut()

      throw error
    }
  }

  const hasRoles = useCallback((roles: string | string[]) => {
    if (!Array.isArray(roles)) {
      return Cookies.get('current-role') === roles
    }

    return roles.some((role) => Cookies.get('current-role') === role)
  }, [])

  const isStudent = hasRoles([Role.STUDENT])
  const isTeacher = hasRoles([Role.TEACHER])
  const isAdmin = hasRoles([Role.SCHOOL_ADMIN])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)

      if (!user) {
        signOut()
      }
    })

    return unsubscribe
  }, [auth, signOut])

  useEffect(() => {
    // Subcribe for sign in, sign out and token refresh events.
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      // Check if user still signed in
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult(true)
          setIdTokenResult(tokenResult)

          // Check if user is not in the system
          if (!tokenResult.claims.external_id) {
            signOut()
          }
          // When user refresh the page after logged in, state did not init so we will have to verify and update the state again
          else if (typeof loggedIn === 'undefined') {
            await verifyToken({ idToken: tokenResult.token })
            setLoggedIn(true)

            localStorage.setItem('access_token', tokenResult.token)
          }
        } catch (error) {
          signOut()
        } finally {
          setLoading(false)
        }
      } else {
        setIdTokenResult(null)
        setLoading(false)
      }
    })

    return unsubscribe
  }, [auth, loggedIn, signOut, verifyToken])

  const value = {
    loggedIn,
    currentUser,
    hasRoles,
    roles: userRoles,
    isStudent,
    isTeacher,
    isAdmin,
    teacherId,
    setTeacherIdValue,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword,
    changePassword,
    verifyPassword,
    verifyPasswordResetCode,
    confirmPasswordReset,
    currentRole: Cookies.get('current-role') || '',
    setCurrentRole,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
