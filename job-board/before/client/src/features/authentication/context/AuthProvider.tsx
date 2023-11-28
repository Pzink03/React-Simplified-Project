import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ReactNode, createContext, useState } from "react"
import { User } from "../constants/types"
import { signup as signupService } from "../services/authentication"
import { useLocation, useNavigate } from "react-router-dom"





type AuthProviderProps = {
  children: ReactNode
}

type AuthContext = {
    // login: (email: string, password: string) => Promise<void>,
    signup: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    isLoggedIn: boolean,
    isLoadingUser: boolean,
    user?: User
}

export const Context = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const [ isLoadingUser, setIsLoadingUser ] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()


    function signup(email: string, password: string) {
      return signupService(email, password).then(user => {
        setUser(user)
        navigate(location.state?.location ?? '/')

    })
    }

    function logout() {
      return Promise.resolve()
    }

  return (
    <Context.Provider
      value={{ user, isLoadingUser, signup, logout, isLoggedIn: user != null

      }}
    >
      {children}
    </Context.Provider>
  )

}
