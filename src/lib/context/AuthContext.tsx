/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { auth, db } from "../firebase-config"
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
interface AuthContextProps {
  children: ReactNode;
}

interface TodoProps {
  id: string
  title: string
  status: boolean
  description: string
}
interface AuthProviderProps {
   user: User | null;
    signUp: (email: string, password: string, userName: string) => Promise<void>
  logIn: (email: string, password: string) => Promise<void> ;
  logOut: () => Promise<void>;
  addTodoHandler: (title: string, description: string) => Promise<void>
  loading: boolean
  todo: TodoProps[],
  loadingTodo: boolean
  getTodoList: () => Promise<void>
}
const AuthContext = createContext<AuthProviderProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [todo, setTodo] = useState<TodoProps[]>([])
  const [loadingTodo, setLoadingTodo] = useState<boolean>(true)

  

    const signUp = async (email: string, password: string) => {
    try {
       const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      setUser(user);
       sessionStorage.setItem('user', "true")
    } catch (error: any) {
      console.error(error.message)
    }
  };

  const logIn = async (email: string, password: string) => {
     try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      setUser(user);
         console.log("logged in!")
         sessionStorage.setItem('user', "true")
     } catch (error: any) {
      console.error(error.message)
     }
  }
  
  const logOut = async () => {
    try {
      await signOut(auth)
      sessionStorage.removeItem("user")
         console.log("logged out")
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const addTodoHandler = async(title:string, description: string) => {
    try {
      await setDoc(doc(db, "Todos", uuidv4()), {
        title: title,
        description: description,
        status: false
      });
    } catch (error: any) {
      console.log({error})
    }
  }

   const getTodoList = async () => {
      const todoRef = collection(db, "Todos")

    try { 
      const getTodo = await getDocs(todoRef)
      const allTodo: any[] = []
      getTodo.docs.map((doc) => (allTodo.push({
        id: doc.id,
        ...doc.data()
      })))
      
      setTodo(allTodo)
      setLoadingTodo(false)
    } catch (error: any) {
      toast.error('failed to fetch todos!!')
    }
  }

  useEffect(() => {
    getTodoList()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {  
      setUser(user)
      setLoading(false)
      })
   return () => unsubscribe()
  }, [])   
  

  const authProviderValue: AuthProviderProps = {
    logIn, logOut, user, signUp, addTodoHandler, loading, todo, loadingTodo, getTodoList
  };

  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
