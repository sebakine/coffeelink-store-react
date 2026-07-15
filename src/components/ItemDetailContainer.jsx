import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { getProductById } from '../services/products'
import ItemDetail from './ItemDetail'
import NotFound from './NotFound'

// Componente CONTENEDOR: obtiene el producto por id y delega la vista a ItemDetail.
function ItemDetailContainer() {
  // useParams obtiene el :id del producto desde la URL (/item/:id).
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    // Consulta a Firestore que devuelve el producto por id de documento (o null).
    getProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
    // id en las dependencias para recargar al cambiar de producto.
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-32 text-stone-500">
        <Loader2 className="h-7 w-7 animate-spin text-amber-800" />
        <p className="text-sm">Cargando producto…</p>
      </div>
    )
  }

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-5 py-32 text-center text-stone-500">
        No pudimos cargar el producto. Intentá de nuevo en unos minutos.
      </p>
    )
  }

  // Si el id no existe, reutilizamos la vista 404.
  if (!product) return <NotFound />

  return <ItemDetail product={product} />
}

export default ItemDetailContainer
