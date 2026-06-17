import React from "react";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";

// поиск и выбор категории
function SearchBar(props) {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Поиск по названию..."
          value={props.searchText}
          onChange={function (e) { props.onSearchChange(e.target.value); }}
        />
      </div>
      <Select value={props.category} onChange={function (e) { props.onCategoryChange(e.target.value); }}>
        <option value="all">Все категории</option>
        {/* map — выводим каждую категорию */}
        {props.categories.map(function (cat) {
          return <option key={cat} value={cat}>{cat}</option>;
        })}
      </Select>
    </div>
  );
}

export { SearchBar };
