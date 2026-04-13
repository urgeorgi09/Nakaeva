import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Удобства | Накева Къща' }

const amenities = [
  {
    icon: '🧖',
    title: 'Финландска сауна',
    description: 'Традиционна финландска сауна за до 6 човека. Идеална за релакс след дълъг ден сред природата.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600',
  },
  {
    icon: '💦',
    title: 'Джакузи',
    description: 'Открит джакузи с хидромасаж под звездното небе. Незабравимо преживяване по всяко време на годината.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
  },
  {
    icon: '🔥',
    title: 'Камина',
    description: 'Уютна камина в общата всекидневна — перфектна за зимни вечери с чаша вино и добра компания.',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600',
  },
  {
    icon: '🍖',
    title: 'Барбекю зона',
    description: 'Оборудвана барбекю зона с голяма маса на открито. Идеална за летни вечери с приятели.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
  },
  {
    icon: '🎬',
    title: 'Лятно кино',
    description: 'Проектор и екран на открито за незабравими кино вечери под звездите.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
  },
  {
    icon: '👶',
    title: 'Детски кът',
    description: 'Безопасна и забавна зона за деца с игри, книги и занимания. Родителите почиват, децата се забавляват.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
]

const extras = [
  'Безплатен Wi-Fi навсякъде', 'Напълно оборудвана кухня', 'Паркинг за 4 коли',
  'Постелъчно бельо и кърпи', 'Климатик в стаите', 'Телевизор в общата зала',
  'Настолни игри', 'Библиотека', 'Детско легло (при заявка)',
]

export default function AmenitiesPage() {
  return (
    <div className="pt-16">
      <div className="relative h-64 flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200" alt="Удобства" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-4xl md:text-5xl mb-2">Удобства</h1>
          <p className="text-white/80">Всичко за перфектна почивка</p>
        </div>
      </div>

      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((a) => (
              <div key={a.title} className="card">
                <div className="relative h-48">
                  <Image src={a.image} alt={a.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 text-3xl bg-white/90 rounded-full w-12 h-12 flex items-center justify-center">
                    {a.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-green mb-2">{a.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-beige">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title mb-8">Включено в наема</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extras.map((e) => (
              <div key={e} className="flex items-center gap-2 bg-white rounded-lg p-3 text-sm">
                <span className="text-green">✓</span> {e}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
