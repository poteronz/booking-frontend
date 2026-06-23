// Мок-данные для тестов

export const mockUser = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  email: 'test@test.com',
  password: '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ12', // хеш "password123"
  firstName: 'Иван',
  lastName: 'Иванов',
  phone: '+7 999 111 22 33',
  role: 'USER' as const,
  avatar: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockAdmin = {
  ...mockUser,
  id: '550e8400-e29b-41d4-a716-446655440001',
  email: 'admin@booking.com',
  role: 'ADMIN' as const,
};

export const mockOwner = {
  ...mockUser,
  id: '550e8400-e29b-41d4-a716-446655440002',
  email: 'owner@test.com',
  role: 'OWNER' as const,
};

export const mockCategory = {
  id: '660e8400-e29b-41d4-a716-446655440000',
  name: 'Квартиры',
  description: 'Городские квартиры',
  icon: '🏢',
};

export const mockAmenity = {
  id: '770e8400-e29b-41d4-a716-446655440000',
  name: 'Wi-Fi',
  icon: '📶',
};

export const mockListing = {
  id: '880e8400-e29b-41d4-a716-446655440000',
  title: 'Уютная квартира в центре',
  description: 'Просторная квартира рядом с метро',
  price: 3500,
  address: 'ул. Пушкина, д. 10',
  city: 'Москва',
  country: 'Россия',
  images: ['https://picsum.photos/200'],
  maxGuests: 4,
  isActive: true,
  ownerId: mockOwner.id,
  categoryId: mockCategory.id,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
  category: mockCategory,
  owner: { id: mockOwner.id, firstName: mockOwner.firstName, lastName: mockOwner.lastName, avatar: null },
  amenities: [],
  reviews: [],
  _count: { reviews: 0, bookings: 0 },
};

export const mockBooking = {
  id: '990e8400-e29b-41d4-a716-446655440000',
  checkIn: new Date('2024-03-01'),
  checkOut: new Date('2024-03-05'),
  guests: 2,
  totalPrice: 14000,
  status: 'PENDING' as const,
  userId: mockUser.id,
  listingId: mockListing.id,
  createdAt: new Date('2024-02-20'),
  updatedAt: new Date('2024-02-20'),
  listing: mockListing,
  user: { id: mockUser.id, firstName: mockUser.firstName, lastName: mockUser.lastName, email: mockUser.email, phone: mockUser.phone },
  payment: null,
};

export const mockReview = {
  id: 'aa0e8400-e29b-41d4-a716-446655440000',
  rating: 5,
  comment: 'Отличное место!',
  userId: mockUser.id,
  listingId: mockListing.id,
  createdAt: new Date('2024-04-01'),
  updatedAt: new Date('2024-04-01'),
  user: { id: mockUser.id, firstName: mockUser.firstName, lastName: mockUser.lastName, avatar: null },
};

export const mockPayment = {
  id: 'bb0e8400-e29b-41d4-a716-446655440000',
  amount: 14000,
  method: 'CARD' as const,
  status: 'PENDING' as const,
  bookingId: mockBooking.id,
  createdAt: new Date('2024-02-20'),
  booking: mockBooking,
};

export const mockNotification = {
  id: 'cc0e8400-e29b-41d4-a716-446655440000',
  type: 'BOOKING_CONFIRMED' as const,
  title: 'Бронирование подтверждено',
  message: 'Ваше бронирование подтверждено',
  isRead: false,
  userId: mockUser.id,
  createdAt: new Date('2024-02-21'),
};
