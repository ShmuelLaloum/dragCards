import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <div className="search-container">
      <Input
        placeholder="Search available products..."
        size="large"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
