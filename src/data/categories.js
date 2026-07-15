export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'granos', label: 'Granos' },
  { id: 'cafeteras', label: 'Cafeteras' },
  { id: 'accesorios', label: 'Accesorios' },
]

// Valida que la categoría exista (útil para mostrar la 404 en rutas inventadas).
export const categoryExists = (categoryId) =>
  CATEGORIES.some((category) => category.id === categoryId && category.id !== 'all')
