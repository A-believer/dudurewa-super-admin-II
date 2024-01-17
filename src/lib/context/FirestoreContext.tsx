/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from "../firebase-config";
interface FirestoreContextProps {
children: ReactNode;
}

interface TodoProps {
  id: string
  title: string
  status: boolean
  description: string
}

interface OrderProps {
  id: string,
    customerName: string,
    shawarmaType: string,
    noOfWrap: string,
    location: string,
    customerContact: string,
    riderName: string,
    deliveryFee: string,
    deliveryOption: string,
    price: number,
    message: string
}

interface FirestoreProviderProps {
    addTodoHandler: (title: string, description: string) => Promise<void>
    addNewOrderHandler:  (
        customerName: string,
        shawarmaType: string,
        noOfWrap: string,
        location: string,
        customerContact: string,
        riderName: string,
        deliveryFee: string,
        deliveryOption: string,
        message: string
        ) => Promise<void>
    todo: TodoProps[]
    order: OrderProps[]
    loadingTodo: boolean
    loadingOrder: boolean
    getTodoList: () => Promise<void>
    getOrderList: () => Promise<void>
}



const FirestoreContext = createContext<FirestoreProviderProps | undefined>(undefined)


export const FirestoreProvider: React.FC<FirestoreContextProps> = ({ children }) => {
    
    const [todo, setTodo] = useState<TodoProps[]>([])
    const [loadingTodo, setLoadingTodo] = useState<boolean>(true)
    const [order, setOrder] = useState<OrderProps[]>([])
  const [loadingOrder, setLoadingOrder] = useState<boolean>(true)
  const [shawarmaTypePrice, setShawarmaTypePrice] = useState<number>(0)
    
    const addTodoHandler = async(title:string, description: string) => {
    try {
      await setDoc(doc(db, "Todos", uuidv4()), {
        title: title,
        description: description,
        status: false,
        timestamp: serverTimestamp()
      });
    } catch (error: any) {
      console.log({error})
    }
  }

   const getTodoList = async () => {
      const todoRef = collection(db, "Todos")

    try { 
      const q = query(todoRef, orderBy("timestamp", "asc"))
      const getTodo = await getDocs(q)
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

  const addNewOrderHandler = async (
    customerName: string,
    shawarmaType: string,
    noOfWrap: string,
    location: string,
    customerContact: string,
    riderName: string,
    deliveryFee: string,
    deliveryOption: string,
    message: string, 
  ) => {

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const orderRef = doc(db, "Orders", uuidv4())
    const dailyOrdersRef = doc(db, "OrderHistory", dateString)
    const dailyOrdersDoc = await getDoc(dailyOrdersRef)
    
    const newOrder = {
        customerName: customerName,
        shawarmaType: shawarmaType,
        noOfWrap: noOfWrap,
        location: location,
        customerContact: customerContact,
        riderName: riderName,
        deliveryFee: deliveryFee,
        deliveryOption: deliveryOption,
        price: parseFloat(noOfWrap) * shawarmaTypePrice,
        message: message,
        total: (parseFloat(noOfWrap) * shawarmaTypePrice) + parseFloat(deliveryFee),
        timestamp: serverTimestamp(),
        status: false,
        id: uuidv4()
      }


    try {
      if (shawarmaType === "Lite") {
        setShawarmaTypePrice(1700)
      }
      if (shawarmaType === "Regular") {
        setShawarmaTypePrice(2000)
      }
      if (shawarmaType === "Pro") {
        setShawarmaTypePrice(2300)
      }
      await setDoc(orderRef, newOrder);

      if (dailyOrdersDoc.exists()) {
      const updatedOrders = [...dailyOrdersDoc.data().orders, newOrder];
        await updateDoc(dailyOrdersRef, {
          id: dateString,
      total: "",
          orders: updatedOrders
        });
    } else {
        await setDoc(dailyOrdersRef, {
          id: dateString,
      total: "",
          orders: [newOrder]
        });
    }

   
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const getOrderList = async () => {
      const orderRef = collection(db, "Orders")

    try { 
      const q = query(orderRef, orderBy("timestamp", "desc"))
      const getOrder = await getDocs(q)
      const allOrder: any[] = []
      getOrder.docs.map((doc) => (allOrder.push({
        id: doc.id,
        ...doc.data()
      })))
      
      setOrder(allOrder)
      setLoadingOrder(false)
    } catch (error: any) {
      toast.error('failed to fetch todos!!')
    }
  }

 

  

    const firestoreProviderValue: FirestoreProviderProps = {
        todo,
        loadingTodo,
        getTodoList,
        addTodoHandler,
        addNewOrderHandler,
        getOrderList,
        order,
        loadingOrder
    }

    return <FirestoreContext.Provider value={firestoreProviderValue}>
        { children}
    </FirestoreContext.Provider>
}

export const useFirestore = () => {
    const context = useContext(FirestoreContext)

    if (!context) {
        throw new Error("useFirestore must be with a FirestoreProvider")
    }
    return context
}