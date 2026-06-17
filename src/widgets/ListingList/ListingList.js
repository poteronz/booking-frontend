import React, { useState } from "react";
import { getAllListings, ListingCard } from "../../entities/listing";
import { SearchBar } from "../../features/search";

// виджет - список услуг с поиском и фильтрацией
function ListingList(props) {
  var [searchText, setSearchText] = useState("");
  var [category, setCategory] = useState("all");

  var allListings = getAllListings();

  // собираем уникальные категории через for
  var categories = [];
  for (var i = 0; i < allListings.length; i++) {
    var cat = allListings[i].category;
    if (categories.indexOf(cat) === -1) {
      categories.push(cat);
    }
  }

  // filter — фильтруем по поиску и категории
  var filtered = allListings.filter(function (item) {
    var matchSearch = true;
    if (searchText !== "") {
      // проверяем есть ли текст в названии (приводим к нижнему регистру)
      var lower = item.title.toLowerCase();
      if (lower.indexOf(searchText.toLowerCase()) === -1) {
        matchSearch = false;
      }
    }

    var matchCategory = true;
    if (category !== "all") {
      if (item.category !== category) {
        matchCategory = false;
      }
    }

    return matchSearch && matchCategory;
  });

  return (
    <div>
      <div className="mb-6">
        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-8">Ничего не найдено</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* map — выводим карточки */}
        {filtered.map(function (listing) {
          return (
            <ListingCard
              key={listing.id}
              listing={listing}
              onBook={function () { props.onBook(listing); }}
            />
          );
        })}
      </div>
    </div>
  );
}

export { ListingList };
