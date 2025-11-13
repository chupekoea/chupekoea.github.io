import type { Product } from '@/entities/product/model/types'
import type { Certificate } from '@/entities/certificate/model/types'

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Липовый мёд',
    description: 'Натуральный светлый мёд с нежным ароматом липового цвета',
    price: 850,
    weight: '0.5 кг',
    image: 'https://www.ferma-derevnya.ru/upload/iblock/75d/75dd9838442fd0c93b7e49601f05b59f.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Гречишный мёд',
    description: 'Тёмный мёд с насыщенным вкусом и богатым составом',
    price: 950,
    weight: '0.5 кг',
    image: 'https://i-uley.pro/upload/iblock/055/bqtvj77in9r3dnzjzzhin9dxtbnyxz1y.jpg',
    inStock: true
  },
  {
    id: 3,
    name: 'Цветочный мёд',
    description: 'Разнотравный мёд с луговых цветов',
    price: 750,
    weight: '0.5 кг',
    image: 'https://prodazha-meda.ru/images/sorta-meda/cvetochny-5.jpg',
    inStock: true
  },
  {
    id: 4,
    name: 'Акациевый мёд',
    description: 'Прозрачный жидкий мёд с деликатным вкусом',
    price: 1100,
    weight: '0.5 кг',
    image: 'https://medoveya.ru/upload/iblock/a92/ydjawsk3b6w41qnwy4f14ku8la99svl0.jpg',
    inStock: true
  },
  {
    id: 5,
    name: 'Каштановый мёд',
    description: 'Тёмный мёд с лёгкой горчинкой и ореховым послевкусием',
    price: 1050,
    weight: '0.5 кг',
    image: 'https://darkavkaz.ru/wa-data/public/shop/products/00/webp/74/03/10374/images/27908/27908.1600.webp',
    inStock: false
  },
  {
    id: 6,
    name: 'Подсолнечный мёд',
    description: 'Золотистый мёд с ярким солнечным ароматом',
    price: 700,
    weight: '0.5 кг',
    image: 'https://glav-dacha.ru/wp-content/uploads/2020/11/podsolnechnikovyy-med1.jpg',
    inStock: true
  }
]

export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: 'Сертификат соответствия ГОСТ',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    issueDate: '2024-01-15'
  },
  {
    id: 2,
    title: 'Декларация о соответствии',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    issueDate: '2024-03-20'
  },
  {
    id: 3,
    title: 'Ветеринарное свидетельство',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    issueDate: '2024-05-10'
  }
]

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: 'Натуральный мёд с собственной пасеки',
    subtitle: 'Экологически чистый продукт от наших пчёл',
    image: '../images/natural-honey.png'
  },
  {
    id: 2,
    title: 'Более 20 лет опыта пчеловодства',
    subtitle: 'Традиции качества передаются из поколения в поколение',
    image: '../images/old-place.png'
  },
  {
    id: 3,
    title: 'Прямая доставка от производителя',
    subtitle: 'Свежий мёд без посредников',
    image: '../images/delivery.png'
  }
]

export const APIARIES: Apiary[] = [
  {
    id: 1,
    name: 'Луговая пасека',
    coordinates: [55.7558, 37.6173],
    description: 'Основная пасека с 50 ульями. Луговое разнотравье.',
    area: 'Московская область, Луховицкий район',
    honeyTypes: ['Цветочный', 'Липовый', 'Разнотравье']
  },
  {
    id: 2,
    name: 'Лесная пасека',
    coordinates: [55.8558, 37.5173],
    description: 'Пасека в лесном массиве. 30 ульев.',
    area: 'Московская область, Сергиево-Посадский район',
    honeyTypes: ['Гречишный', 'Липовый', 'Лесной']
  },
  {
    id: 3,
    name: 'Акациевая пасека',
    coordinates: [55.6558, 37.7173],
    description: 'Специализированная пасека у акациевых рощ. 25 ульев.',
    area: 'Московская область, Раменский район',
    honeyTypes: ['Акациевый', 'Цветочный']
  }
]