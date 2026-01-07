import { Row, Col } from "antd";
import { useState } from "react";
import Column from "../components/Column";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import SearchSection from "../components/SearchSection";
import { DndContext } from "@dnd-kit/core";
import { useKanbanBoard } from "../hooks/useKanbanBoard";

export default function Dashboard() {
  const { cardsState, handleDragEnd, sensors, isLoading, error, refetch } =
    useKanbanBoard();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <Loader />;
  if (error) return <ErrorState onRetry={refetch} />;

  const filteredAvailable = cardsState.available.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <SearchSection onSearch={setSearchTerm} />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Column
              id="available"
              title={`🟦 Available (${filteredAvailable.length})`}
              items={filteredAvailable}
            />
          </Col>

          <Col xs={24} md={8}>
            <Column
              id="selected"
              title={`🟨 Selected (${cardsState.selected.length})`}
              items={cardsState.selected}
            />
          </Col>

          <Col xs={24} md={8}>
            <Column
              id="favorites"
              title={`🟩 Favorites (${cardsState.favorites.length})`}
              items={cardsState.favorites}
            />
          </Col>
        </Row>
      </DndContext>
    </div>
  );
}
