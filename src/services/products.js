import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'

const productsRef = collection(db, 'products')

// Devuelve todos los productos o, si se pasa categoryId, solo los de esa categoría.
export const getProducts = async (categoryId) => {
  const productsQuery = categoryId
    ? query(productsRef, where('category', '==', categoryId))
    : productsRef

  const snapshot = await getDocs(productsQuery)
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
}

// Busca un producto por el id de su documento; null si no existe.
export const getProductById = async (id) => {
  const snapshot = await getDoc(doc(db, 'products', id))
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}
