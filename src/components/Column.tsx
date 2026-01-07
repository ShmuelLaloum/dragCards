import { useDroppable } from "@dnd-kit/core";
import { Card, Typography } from "antd";
import type { ColumnProps } from "../types/type";
import ProductCard from "./ProductCard";

export default function Column({ id, title, items }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Card
      ref={setNodeRef}
      className={`column-card ${isOver ? "column-card-over" : ""}`}
      style={{
        backgroundColor: isOver ? "#e6f7ff" : undefined, 
        borderColor: isOver ? "#1890ff" : undefined,
      }}
      title={
        <Typography.Title level={3} className="column-title">
          {title}
        </Typography.Title>
      }
    >
      <div className="column-card-body">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </Card>
  );
}
