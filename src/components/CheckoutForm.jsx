import { useState } from 'react'
import { Loader2 } from 'lucide-react'

// Campo de formulario reutilizable con etiqueta y mensaje de error.
function Field({ label, name, type = 'text', value, onChange, error, placeholder, autoComplete }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400
                    transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2
                    ${
                      error
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-stone-300 focus:border-amber-800 focus:ring-amber-800/20'
                    }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9\s+()-]{7,}$/
const INITIAL_FORM = { nombre: '', telefono: '', email: '', confirmEmail: '' }

// Componente de presentación: captura y valida los datos del comprador.
// Al validar correctamente, emite onConfirm({ nombre, telefono, email }).
function CheckoutForm({ onConfirm, processing }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.nombre.trim().length < 2) next.nombre = 'Ingresá tu nombre completo.'
    if (!PHONE_REGEX.test(form.telefono.trim())) next.telefono = 'Ingresá un teléfono válido.'
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = 'Ingresá un email válido.'
    if (form.confirmEmail.trim() !== form.email.trim()) {
      next.confirmEmail = 'Los emails no coinciden.'
    }
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onConfirm({
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="font-display text-xl font-medium text-stone-900">Tus datos</h2>

        <Field
          label="Nombre completo"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          error={errors.nombre}
          placeholder="Ana Pérez"
          autoComplete="name"
        />
        <Field
          label="Teléfono"
          name="telefono"
          type="tel"
          value={form.telefono}
          onChange={handleChange}
          error={errors.telefono}
          placeholder="+54 11 5555 5555"
          autoComplete="tel"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="ana@email.com"
          autoComplete="email"
        />
        <Field
          label="Confirmar email"
          name="confirmEmail"
          type="email"
          value={form.confirmEmail}
          onChange={handleChange}
          error={errors.confirmEmail}
          placeholder="ana@email.com"
        />

        <button
          type="submit"
          disabled={processing}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-800 px-6 py-3.5
                     text-sm font-semibold text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                     hover:bg-amber-900 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Procesando orden…
            </>
          ) : (
            'Finalizar Compra'
          )}
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
