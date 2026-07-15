import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import CartItem from './CartItem'

// Página del carrito (ruta /cart): lista los CartItem, muestra los totales
// y ofrece las acciones de vaciar o avanzar al checkout.
function Cart() {
  const { items, removeItem, clearCart, totalProducts, totalPrice } = useCart()

  // Renderizado condicional: mensaje de carrito vacío.
  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center sm:px-8">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-stone-100 text-stone-400">
          <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-2xl font-light text-stone-900">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-stone-600">
          Explorá el catálogo y sumá tus granos, cafeteras y accesorios favoritos.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5
                     text-sm font-semibold text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                     hover:bg-amber-900 hover:shadow-lg"
        >
          Ir al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600
                   transition-colors duration-300 ease-in-out hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" /> Seguir comprando
      </Link>

      <h1 className="mt-6 font-display text-4xl font-light text-stone-900">Tu carrito</h1>
      <p className="mt-2 text-stone-500">
        {totalProducts()} {totalProducts() > 1 ? 'unidades' : 'unidad'} en total
      </p>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-3">
        {/* Listado de productos agregados */}
        <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white px-6 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeItem} />
          ))}
        </ul>

        {/* Resumen y acciones */}
        <aside className="rounded-2xl border border-stone-200 bg-stone-100/60 p-6 sm:p-8">
          <h2 className="font-display text-xl font-medium text-stone-900">Resumen</h2>

          <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-4">
            <span className="text-stone-600">Total</span>
            <span className="font-display text-2xl font-medium text-stone-900">
              {formatPrice(totalPrice())}
            </span>
          </div>

          <Link
            to="/checkout"
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-800
                       px-6 py-3.5 text-sm font-semibold text-stone-50 shadow-sm
                       transition-all duration-300 ease-in-out hover:bg-amber-900 hover:shadow-lg"
          >
            Finalizar compra
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={clearCart}
            className="mt-3 w-full text-center text-sm font-medium text-stone-500
                       transition-colors duration-300 ease-in-out hover:text-red-600"
          >
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  )
}

export default Cart
