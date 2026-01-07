import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <div className="search-container">
      <Input
        placeholder="Search available products..."
        size="large"
        value={searchInput}
        onChange={(e) => {
          const newValue = e.target.value;
          setSearchInput(newValue);

          if (newValue === "") {
            onSearch("");
          }
        }}
        onPressEnter={handleSearch}
        allowClear
      />

      <Button
        type="primary"
        size="large"
        icon={<SearchOutlined />}
        onClick={handleSearch}
        className="search-button"
      ></Button>
    </div>
  );
}
