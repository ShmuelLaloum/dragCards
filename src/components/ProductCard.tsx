import { useDraggable } from "@dnd-kit/core";
import { Card } from "antd";
import type { ProductCardProps } from "../types/type";

export default function ProductCard({ product }: ProductCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: product.id,
      data: {
        product,
      },
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: isDragging ? 0.9 : 1,
      }}
      className="product-card"
      {...listeners}
      {...attributes}
    >
      <Card
        hoverable
        cover={
          <div className="product-card-image-container">
            <img
              alt={product.title}
              src={product.image}
              className="product-card-image"
            />
          </div>
        }
        bodyStyle={{ padding: "12px 24px" }}
      >
        <Card.Meta
          title={
            <div className="product-card-title-container">
              <span className="product-card-title" title={product.title}>
                {product.title}
              </span>
              <span className="product-card-price">${product.price}</span>
            </div>
          }
          description={
            <div
              className="product-card-description"
              title={product.description}
            >
              {product.description}
            </div>
          }
        />
      </Card>
    </div>
  );
}
