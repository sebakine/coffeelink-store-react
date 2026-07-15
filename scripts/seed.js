import { initializeApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

// Carga única del catálogo a la colección 'products' de Firestore.
// Uso: npm run seed  (lee las credenciales desde el archivo .env)

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

if (!firebaseConfig.projectId) {
  console.error('Faltan las credenciales: completá el archivo .env antes de correr el seed.')
  process.exit(1)
}

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`

const products = [
  {
    id: 'g1',
    title: 'Etiopía Yirgacheffe',
    description: 'Tueste claro de notas florales y cítricas, cuerpo sedoso. Ideal para métodos de filtrado.',
    price: 9800,
    stock: 18,
    category: 'granos',
    pictureUrl: img('1510707577719-ae7c14805e3a'),
  },
  {
    id: 'g2',
    title: 'Colombia Huila',
    description: 'Dulzor a caramelo con final achocolatado. Un clásico equilibrado y versátil.',
    price: 8900,
    stock: 25,
    category: 'granos',
    pictureUrl: img('1497935586351-b67a49e012bf'),
  },
  {
    id: 'g3',
    title: 'Brasil Cerrado',
    description: 'Cuerpo intenso, baja acidez y notas a nuez tostada. Base perfecta para espresso.',
    price: 8200,
    stock: 30,
    category: 'granos',
    pictureUrl: img('1442512595331-e89e73853f31'),
  },
  {
    id: 'g4',
    title: 'Guatemala Antigua',
    description: 'Acidez brillante y aroma a especias. Cultivado en altura en suelos volcánicos.',
    price: 10500,
    stock: 12,
    category: 'granos',
    pictureUrl: img('1447933601403-0c6688de566e'),
  },
  {
    id: 'g5',
    title: 'Kenia AA',
    description: 'Acidez vibrante a grosella negra y pomelo. Lote de subasta, edición limitada.',
    price: 12800,
    stock: 0,
    category: 'granos',
    pictureUrl: img('1524350876685-274059332603'),
  },
  {
    id: 'c1',
    title: 'Prensa Francesa 1L',
    description: 'Extracción por inmersión en vidrio borosilicato. Cuerpo pleno en cada taza.',
    price: 24900,
    stock: 8,
    category: 'cafeteras',
    pictureUrl: img('1521302080334-4bebac2763a6'),
  },
  {
    id: 'c2',
    title: 'Cafetera de Goteo',
    description: 'Preparación automática y consistente para disfrutar de varias tazas a la vez.',
    price: 58900,
    stock: 6,
    category: 'cafeteras',
    pictureUrl: img('1611854779393-1b2da9d400fe'),
  },
  {
    id: 'c3',
    title: 'Pour Over V60',
    description: 'Dripper de cerámica para una extracción limpia y un perfil de taza brillante.',
    price: 18700,
    stock: 15,
    category: 'cafeteras',
    pictureUrl: img('1559056199-641a0ac8b55e'),
  },
  {
    id: 'c4',
    title: 'Espresso Manual',
    description: 'Palanca de presión para shots intensos con crema densa. Diseño de acero pulido.',
    price: 72500,
    stock: 4,
    category: 'cafeteras',
    pictureUrl: img('1514432324607-a09d9b4aefdd'),
  },
  {
    id: 'a1',
    title: 'Molinillo Manual',
    description: 'Muelas cónicas de cerámica con molienda regulable. Silencioso y portátil.',
    price: 31500,
    stock: 20,
    category: 'accesorios',
    pictureUrl: img('1495474472287-4d71bcdd2085'),
  },
  {
    id: 'a2',
    title: 'Taza de Cerámica',
    description: 'Cerámica esmaltada de 250 ml que conserva la temperatura. Tacto suave y mate.',
    price: 6900,
    stock: 40,
    category: 'accesorios',
    pictureUrl: img('1459755486867-b55449bb39ff'),
  },
  {
    id: 'a3',
    title: 'Balanza Digital',
    description: 'Precisión de 0,1 g con temporizador integrado para recetas reproducibles.',
    price: 21900,
    stock: 14,
    category: 'accesorios',
    pictureUrl: img('1506372023823-741c83b836fe'),
  },
  {
    id: 'a4',
    title: 'Kit de Filtros',
    description: 'Pack de 100 filtros de papel sin blanquear para un sabor puro y sin residuos.',
    price: 4500,
    stock: 50,
    category: 'accesorios',
    pictureUrl: img('1453614512568-c4024d13c247'),
  },
]

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// setDoc con id propio (g1, c1, a1…) mantiene URLs estables como /item/g1.
for (const { id, ...data } of products) {
  await setDoc(doc(db, 'products', id), data)
  console.log(`✔ ${id} — ${data.title}`)
}

console.log(`\nListo: ${products.length} productos cargados en Firestore.`)
process.exit(0)
