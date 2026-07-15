import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/orders'
import { formatPrice } from '../utils/format'
import CheckoutForm from './CheckoutForm'

// Página de checkout: muestra el resumen del pedido, delega la captura de
// datos a CheckoutForm y registra la orden real en Firestore al confirmar.
function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const [status, setStatus] = useState('idle') // idle | processing | success
  const [submitError, setSubmitError] = useState(null)
  const [order, setOrder] = useState(null)

  const handleConfirm = async (buyer) => {
    setStatus('processing')
    setSubmitError(null)
    // Copia del pedido antes de vaciar el carrito.
    const snapshot = { items, total: totalPrice() }

    try {
      const orderId = await createOrder(buyer, snapshot.items, snapshot.total)
      setOrder({ id: orderId, buyer, ...snapshot })
      clearCart()
      setStatus('success')
    } catch (error) {
      setSubmitError(
        error.code === 'OUT_OF_STOCK'
          ? `${error.message} Ajustá las cantidades desde el carrito.`
          : 'No pudimos procesar tu orden. Intentá nuevamente en unos minutos.',
      )
      setStatus('idle')
    }
  }

  // Pantalla de éxito: muestra el id real de la orden generada en Firestore.
  if (status === 'success' && order) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
        <div className="animate-fade-in-up rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
          </div>
          <h2 className="mt-6 font-display text-3xl font-light text-stone-900">
            ¡Gracias por tu compra, {order.buyer.nombre.split(' ')[0]}!
          </h2>
          <p className="mt-3 text-stone-600">
            Tu orden fue registrada con éxito. Enviamos la confirmación a{' '}
            <span className="font-medium text-stone-900">{order.buyer.email}</span>.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-stone-100 px-5 py-2 text-sm">
            <span className="text-stone-500">N° de orden</span>
            <span className="font-semibold tracking-wide text-amber-800">{order.id}</span>
          </div>

          <ul className="mt-8 divide-y divide-stone-200 text-left">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <span className="text-stone-700">
                  {item.title} <span className="text-stone-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
            <span className="font-medium text-stone-900">Total abonado</span>
            <span className="font-display text-2xl font-medium text-stone-900">
              {formatPrice(order.total)}
            </span>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5
                       text-sm font-semibold text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                       hover:bg-amber-900 hover:shadow-lg"
          >
            Volver a la tienda
          </Link>
        </div>
      </section>
    )
  }

  // Renderizado condicional: no hay productos para comprar.
  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center sm:px-8">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-stone-100 text-stone-400">
          <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h2 className="mt-6 font-display text-2xl font-light text-stone-900">
          No hay productos para comprar
        </h2>
        <p className="mt-3 text-stone-600">
          Agregá productos al carrito antes de finalizar la compra.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5
                     text-sm font-semibold text-stone-50 transition-all duration-300 ease-in-out hover:bg-amber-900"
        >
          Volver a la tienda
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600
                   transition-colors duration-300 ease-in-out hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al carrito
      </Link>

      <h1 className="mt-6 font-display text-4xl font-light text-stone-900">Finalizar compra</h1>

      {/* Renderizado condicional: error al procesar la orden (ej. sin stock). */}
      {submitError && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{submitError}</p>
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CheckoutForm onConfirm={handleConfirm} processing={status === 'processing'} />
        </div>

        {/* Resumen del pedido */}
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-stone-200 bg-stone-100/60 p-6 sm:p-8">
            <h2 className="font-display text-xl font-medium text-stone-900">Tu pedido</h2>
            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.pictureUrl}
                    alt={item.title}
                    loading="lazy"
                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight text-stone-900">{item.title}</p>
                    <p className="text-xs text-stone-500">{item.quantity} u.</p>
                  </div>
                  <span className="text-sm font-semibold text-stone-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4">
              <span className="text-stone-600">Total</span>
              <span className="font-display text-2xl font-medium text-stone-900">
                {formatPrice(totalPrice())}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
