'use client'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-16">
      <div className="relative h-48 flex items-center justify-center bg-green">
        <div className="text-center text-white">
          <h1 className="font-serif text-4xl mb-2">Контакт</h1>
          <p className="text-white/70">Свържете се с нас</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-green mb-4">Намерете ни</h2>
            <div className="space-y-4">
              {[
                { icon: <MapPin size={18} />, label: 'Адрес', value: 'с. Накево, България' },
                { icon: <Phone size={18} />, label: 'Телефон', value: '+359 888 123 456' },
                { icon: <Mail size={18} />, label: 'Имейл', value: 'info@nakevakushta.bg' },
                { icon: <Clock size={18} />, label: 'Работно време', value: 'Всеки ден 9:00 – 21:00' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <span className="text-green mt-0.5">{c.icon}</span>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d94242.95945531742!2d25.5497351!3d42.4257663!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a841ae7cbc8e3d%3A0x5cc9baef2af96761!2z0JrRitGJ0LAg0LfQsCDQs9C-0YHRgtC4ICLQndCw0LrQtdCy0LDRgtCwINC60YrRidCwIg!5e0!3m2!1sen!2sbg!4v1776086485434!5m2!1sen!2sbg"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Contact form */}
        <div>
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✉️</div>
              <h2 className="font-serif text-2xl text-green mb-2">Съобщението е изпратено!</h2>
              <p className="text-gray-600">Ще отговорим в рамките на 24 часа.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-serif text-2xl text-green mb-4">Изпратете съобщение</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Вашето име</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Имейл</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Съобщение</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green resize-none" />
              </div>
              <button type="submit" className="w-full btn-primary py-3">Изпрати</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
