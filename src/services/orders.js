import {
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from './firebase'

// Crea la orden en Firestore y descuenta el stock de cada producto en un batch atómico.
// Si algún producto no tiene stock suficiente, lanza un error con los títulos afectados.
export const createOrder = async (buyer, items, total) => {
  const batch = writeBatch(db)
  const outOfStock = []

  for (const item of items) {
    const productRef = doc(db, 'products', item.id)
    const snapshot = await getDoc(productRef)
    const stock = snapshot.exists() ? snapshot.data().stock : 0

    if (stock >= item.quantity) {
      batch.update(productRef, { stock: increment(-item.quantity) })
    } else {
      outOfStock.push(item.title)
    }
  }

  if (outOfStock.length > 0) {
    const error = new Error(`Sin stock suficiente de: ${outOfStock.join(', ')}.`)
    error.code = 'OUT_OF_STOCK'
    throw error
  }

  const orderRef = doc(collection(db, 'orders'))
  batch.set(orderRef, {
    buyer,
    items: items.map(({ id, title, price, quantity }) => ({ id, title, price, quantity })),
    total,
    date: serverTimestamp(),
  })

  await batch.commit()
  return orderRef.id
}
