import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

// Ícono del carrito en la NavBar: navega a /cart con React Router
// y muestra el total de unidades leído desde el contexto.
function CartWidget() {
  const { totalProducts } = useCart()
  const count = totalProducts()

  return (
    <Link
      to="/cart"
      aria-label={`Ir al carrito, ${count} productos`}
      className="group relative grid h-11 w-11 place-items-center rounded-full
                 text-stone-800 transition-all duration-300 ease-in-out
                 hover:bg-stone-100 hover:text-amber-800
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
    >
      <ShoppingBag
        className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5"
        strokeWidth={1.75}
      />

      {count > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center
                     rounded-full bg-amber-800 px-1 text-[11px] font-semibold leading-none
                     text-stone-50 ring-2 ring-stone-50"
        >
          {count}
        </span>
      )}
    </Link>
  )
}

export default CartWidget
