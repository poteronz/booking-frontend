// моковые данные услуг (заглушка)

var listings = [
  { id: 1, name: "Стрижка мужская", description: "Классическая мужская стрижка с укладкой", price: 800, duration: 30, category: "Парикмахерская" },
  { id: 2, name: "Стрижка женская", description: "Женская стрижка любой сложности", price: 1500, duration: 60, category: "Парикмахерская" },
  { id: 3, name: "Маникюр", description: "Классический маникюр с покрытием", price: 1200, duration: 45, category: "Ногтевой сервис" },
  { id: 4, name: "Педикюр", description: "Аппаратный педикюр с покрытием", price: 1800, duration: 60, category: "Ногтевой сервис" },
  { id: 5, name: "Массаж спины", description: "Расслабляющий массаж спины и шеи", price: 2000, duration: 40, category: "Массаж" },
  { id: 6, name: "Массаж всего тела", description: "Общий расслабляющий массаж", price: 3500, duration: 90, category: "Массаж" },
  { id: 7, name: "Консультация косметолога", description: "Осмотр кожи и подбор процедур", price: 500, duration: 30, category: "Косметология" },
  { id: 8, name: "Чистка лица", description: "Ультразвуковая чистка лица", price: 2500, duration: 60, category: "Косметология" }
];

// получить все услуги
function getAllListings() {
  return listings;
}

// получить одну услугу по id
function getListingById(id) {
  for (var i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return listings[i];
    }
  }
  return null;
}

export { getAllListings, getListingById };
