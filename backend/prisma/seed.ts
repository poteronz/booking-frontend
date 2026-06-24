import 'dotenv/config';
import {
  BookingStatus,
  NotificationType,
  PaymentMethod,
  PaymentStatus,
  PrismaClient,
  Role,
} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const firstNames = ['Алексей', 'Иван', 'Павел', 'Дмитрий', 'Мария', 'Анна', 'Ольга', 'Екатерина'];
const lastNames = ['Иванов', 'Петров', 'Смирнов', 'Кузнецов', 'Соколова', 'Морозова', 'Волкова', 'Фёдорова'];

const listingSeeds = [
  {
    title: 'Апартаменты у моря в Сочи',
    description:
      'Светлые апартаменты в пяти минутах от пляжа: панорамные окна, удобная кухня, рабочий стол и быстрый Wi‑Fi для удалённой работы.',
    city: 'Сочи',
    address: 'ул. Приморская, 12',
    imageUrl:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    price: 6500,
    categoryIndex: 0,
    amenityIndexes: [0, 2, 4],
  },
  {
    title: 'Семейный дом с террасой',
    description:
      'Уютный дом для семьи и друзей: просторная гостиная, терраса для завтраков, парковка и отдельный вход во двор.',
    city: 'Казань',
    address: 'ул. Лесная, 8',
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    price: 8800,
    categoryIndex: 1,
    amenityIndexes: [1, 3, 4],
  },
  {
    title: 'Студия в центре Москвы',
    description:
      'Компактная студия рядом с метро и кафе: дизайнерский ремонт, отдельная кухня и удобное пространство для двух гостей.',
    city: 'Москва',
    address: 'Тверской бульвар, 21',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 7200,
    categoryIndex: 2,
    amenityIndexes: [0, 2, 4],
  },
  {
    title: 'Лофт с панорамными окнами',
    description:
      'Просторный лофт с высоким потолком, большим количеством света и атмосферой для долгого комфортного проживания.',
    city: 'Санкт-Петербург',
    address: 'наб. Канала Грибоедова, 10',
    imageUrl:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    price: 7900,
    categoryIndex: 0,
    amenityIndexes: [0, 2, 3, 4],
  },
  {
    title: 'Дом с баней и двориком',
    description:
      'Отличный вариант для отдыха на выходных: баня, закрытый дворик, зона барбекю и тёплая домашняя атмосфера.',
    city: 'Калининград',
    address: 'ул. Ясная, 5',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    price: 9100,
    categoryIndex: 1,
    amenityIndexes: [1, 3, 4],
  },
  {
    title: 'Комната рядом с метро',
    description:
      'Практичная комната для короткой поездки: тихий район, хорошая транспортная доступность и аккуратная общая кухня.',
    city: 'Екатеринбург',
    address: 'ул. Малышева, 44',
    imageUrl:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    price: 3500,
    categoryIndex: 2,
    amenityIndexes: [0, 3],
  },
  {
    title: 'Пентхаус с видом на город',
    description:
      'Престижный пентхаус с большой гостиной, панорамным видом и ощущением настоящего городского отдыха премиум-класса.',
    city: 'Москва',
    address: 'Пресненская наб., 6',
    imageUrl:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',
    price: 12500,
    categoryIndex: 0,
    amenityIndexes: [0, 2, 4],
  },
  {
    title: 'Уютная студия для пары',
    description:
      'Тёплая и тихая студия для двоих: мягкий интерьер, современная техника и приятная зона отдыха после прогулок.',
    city: 'Сочи',
    address: 'ул. Навагинская, 18',
    imageUrl:
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80',
    price: 5600,
    categoryIndex: 2,
    amenityIndexes: [0, 2],
  },
  {
    title: 'Шале в сосновом лесу',
    description:
      'Атмосферное шале вдали от шума: деревянные стены, камин, спокойствие леса и много пространства для отдыха.',
    city: 'Красная Поляна',
    address: 'ул. Горная, 3',
    imageUrl:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    price: 9900,
    categoryIndex: 1,
    amenityIndexes: [1, 2, 4],
  },
  {
    title: 'Квартира с дизайнерским ремонтом',
    description:
      'Стильная квартира для комфортной поездки: новые материалы, современная кухня, приятная спальня и спокойная атмосфера.',
    city: 'Санкт-Петербург',
    address: 'Лиговский пр., 80',
    imageUrl:
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
    price: 8400,
    categoryIndex: 0,
    amenityIndexes: [0, 2, 3, 4],
  },
] as const;

function randomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

async function main() {
  console.log('Очистка базы данных...');
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.listingAmenity.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Создание категорий...');
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Квартиры', icon: '🏢', slug: 'apartments' } }),
    prisma.category.create({ data: { name: 'Дома', icon: '🏡', slug: 'houses' } }),
    prisma.category.create({ data: { name: 'Комнаты', icon: '🛏️', slug: 'rooms' } }),
  ]);

  console.log('Создание удобств...');
  const amenities = await Promise.all([
    prisma.amenity.create({ data: { name: 'Wi‑Fi', icon: '📶' } }),
    prisma.amenity.create({ data: { name: 'Парковка', icon: '🅿️' } }),
    prisma.amenity.create({ data: { name: 'Кондиционер', icon: '❄️' } }),
    prisma.amenity.create({ data: { name: 'Стиральная машина', icon: '🧺' } }),
    prisma.amenity.create({ data: { name: 'Кухня', icon: '🍳' } }),
  ]);

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('password123', 10);

  console.log('Создание пользователей...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@booking.com',
      password: adminPassword,
      name: 'Админ Бронируй',
      role: Role.ADMIN,
    },
  });

  const owners = await Promise.all([
    prisma.user.create({
      data: {
        email: 'owner1@booking.com',
        password: userPassword,
        name: randomName(),
        role: Role.OWNER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'owner2@booking.com',
        password: userPassword,
        name: randomName(),
        role: Role.OWNER,
      },
    }),
  ]);

  const users = await Promise.all(
    Array.from({ length: 3 }, (_, index) =>
      prisma.user.create({
        data: {
          email: `user${index + 1}@booking.com`,
          password: userPassword,
          name: randomName(),
          role: Role.USER,
        },
      }),
    ),
  );

  console.log('Создание объявлений...');
  const listings: Array<{ id: string; title: string; city: string | null; address: string | null; ownerId: string }> = [];

  for (const [index, listingSeed] of listingSeeds.entries()) {
    const owner = owners[index % owners.length];
    const category = categories[listingSeed.categoryIndex];

    const listing = await prisma.listing.create({
      data: {
        title: listingSeed.title,
        description: listingSeed.description,
        imageUrl: listingSeed.imageUrl,
        city: listingSeed.city,
        address: listingSeed.address,
        price: listingSeed.price,
        isActive: true,
        ownerId: owner.id,
        categoryId: category.id,
      },
    });

    for (const amenityIndex of listingSeed.amenityIndexes) {
      await prisma.listingAmenity.create({
        data: {
          listingId: listing.id,
          amenityId: amenities[amenityIndex].id,
        },
      });
    }

    listings.push(listing);
  }

  console.log('Создание бронирований...');
  const bookingNotifications: Array<{ userId: string; listingTitle: string; listingCity?: string; confirmed: boolean }> = [];

  for (let index = 0; index < 6; index++) {
    const user = users[index % users.length];
    const listing = listings[index % listings.length];
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() + 2 + index);
    const dateTo = new Date(dateFrom);
    dateTo.setDate(dateTo.getDate() + 2 + (index % 4));
    const days = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24));

    const booking = await prisma.booking.create({
      data: {
        dateFrom,
        dateTo,
        totalPrice: Number(listingSeedPrice(listing.title)) * days,
        status: index < 3 ? BookingStatus.CONFIRMED : BookingStatus.PENDING,
        userId: user.id,
        listingId: listing.id,
      },
    });

    const confirmed = index < 3;
    bookingNotifications.push({
      userId: user.id,
      listingTitle: listing.title,
      listingCity: listing.city,
      confirmed,
    });

    if (confirmed) {
      await prisma.payment.create({
        data: {
          amount: booking.totalPrice,
          method: PaymentMethod.CARD,
          status: PaymentStatus.COMPLETED,
          bookingId: booking.id,
        },
      });

      await prisma.notification.create({
        data: {
          userId: user.id,
          type: NotificationType.BOOKING_CONFIRMED,
          message: `Бронирование «${listing.title}» подтверждено в ${listing.city}.`,
          isRead: false,
        },
      });

      await prisma.notification.create({
        data: {
          userId: user.id,
          type: NotificationType.PAYMENT_RECEIVED,
          message: `Оплата за «${listing.title}» успешно получена.`,
          isRead: false,
        },
      });
    } else {
      await prisma.notification.create({
        data: {
          userId: user.id,
          type: NotificationType.SYSTEM,
          message: `Бронирование «${listing.title}» создано и ожидает подтверждения.`,
          isRead: false,
        },
      });
    }
  }

  console.log('Создание отзывов...');
  const reviewComments = [
    'Очень уютное место, всё чисто и соответствует фото.',
    'Отличное расположение и приятный хозяин.',
    'Мы отлично отдохнули, обязательно вернёмся ещё раз.',
    'Просторно, тихо и очень комфортно для семьи.',
    'Чистая квартира, удобная кровать и хороший интернет.',
  ];

  for (let index = 0; index < 5; index++) {
    const user = users[index % users.length];
    const listing = listings[index + 2];

    await prisma.review.create({
      data: {
        rating: 4 + (index % 2),
        comment: reviewComments[index],
        userId: user.id,
        listingId: listing.id,
      },
    });
  }

  await prisma.notification.create({
    data: {
      userId: admin.id,
      type: NotificationType.SYSTEM,
      message: 'Демонстрационные данные успешно загружены.',
      isRead: false,
    },
  });

  // Приветственные уведомления для всех пользователей
  const allUsers = [admin, ...owners, ...users];
  for (const u of allUsers) {
    await prisma.notification.create({
      data: {
        userId: u.id,
        type: NotificationType.SYSTEM,
        message: `Добро пожаловать в BookIt! Ваш аккаунт успешно создан.`,
        isRead: false,
      },
    });
  }

  // Уведомления владельцам о созданных объявлениях
  for (const owner of owners) {
    const ownerListings = listings.filter((_, i) => owners[i % owners.length].id === owner.id);
    if (ownerListings.length > 0) {
      await prisma.notification.create({
        data: {
          userId: owner.id,
          type: NotificationType.SYSTEM,
          message: `У вас ${ownerListings.length} активных объявлений на платформе.`,
          isRead: false,
        },
      });
    }
  }

  console.log('Seed завершён!');
}

function listingSeedPrice(title: string) {
  const found = listingSeeds.find((item) => item.title === title);
  return found?.price ?? 5000;
}

main()
  .catch((error) => {
    console.error('Ошибка seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
