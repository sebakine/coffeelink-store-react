import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { formatPrice } from '../utils/format'

// Componente de presentación: una fila del carrito con imagen, datos,
// cantidad, subtotal y botón para eliminar (delegado por props).
function CartItem({ item, onRemove }) {
  return (
    <li className="flex gap-4 py-5 sm:gap-6">
      <Link to={`/item/${item.id}`} className="shrink-0">
        <img
          src={item.pictureUrl}
          alt={item.title}
          loading="lazy"
          className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/item/${item.id}`}
              className="font-display text-lg font-medium leading-tight text-stone-900
                         transition-colors duration-300 ease-in-out hover:text-amber-800"
            >
              {item.title}
            </Link>
            <p className="mt-1 text-sm text-stone-500">
              {formatPrice(item.price)} c/u · {item.quantity}{' '}
              {item.quantity > 1 ? 'unidades' : 'unidad'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Eliminar ${item.title} del carrito`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-stone-400
                       transition-colors duration-300 ease-in-out hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-auto text-base font-semibold text-stone-900">
          Subtotal: {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </li>
  )
}

export default CartItem
