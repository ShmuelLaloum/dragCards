import { Row, Col } from "antd";
import { useState } from "react";
import Column from "../components/Column";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import SearchSection from "../components/SearchSection";
import { DndContext } from "@dnd-kit/core";
import { useKanbanBoard } from "../hooks/useKanbanBoard";
import type { ColumnType } from "../types/type";
import type {Product}from "../types/type";

export default function Dashboard() {
  const { cardsState, handleDragEnd, sensors, isLoading, error, refetch } =
    useKanbanBoard();
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (isLoading) return <Loader />;
  if (error) return <ErrorState onRetry={refetch} />;

  const filteredAvailable = cardsState.available.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: {
    id: ColumnType;
    title: string;
    items: Product[];
  }[] = [
    {
      id: "available",
      title: `🟦 Available (${filteredAvailable.length})`,
      items: filteredAvailable,
    },
    {
      id: "selected",
      title: `🟨 Selected (${cardsState.selected.length})`,
      items: cardsState.selected,
    },
    {
      id: "favorites",
      title: `🟩 Favorites (${cardsState.favorites.length})`,
      items: cardsState.favorites,
    },
  ];

  return (
    <div className="dashboard-container">
      <SearchSection onSearch={setSearchTerm} />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Row gutter={[16, 16]}>
          {columns.map((col) => (
            <Col xs={24} md={8} key={col.id}>
              <Column id={col.id} title={col.title} items={col.items} />
            </Col>
          ))}
        </Row>
      </DndContext>
    </div>
  );
}
