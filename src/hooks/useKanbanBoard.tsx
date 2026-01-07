import {
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useProducts } from "./useProducts";
import type { CardsState, ColumnType } from "../types/type";

export function useKanbanBoard() {
  const { data, isLoading, error, refetch } = useProducts();

  const [cardsState, setCardsState] = useState<CardsState>(() => {
    const saved = localStorage.getItem("cardsState");
    return saved
      ? JSON.parse(saved)
      : {
          available: [],
          selected: [],
          favorites: [],
        };
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    localStorage.setItem("cardsState", JSON.stringify(cardsState));
  }, [cardsState]);

  useEffect(() => {
    if (data) {
      setCardsState((prev) => {
        const selectedIds = new Set(prev.selected.map((p) => p.id));
        const favoriteIds = new Set(prev.favorites.map((p) => p.id));

        const available = data.filter(
          (p) => !selectedIds.has(p.id) && !favoriteIds.has(p.id)
        );

        return {
          ...prev,
          available,
        };
      });
    }
  }, [data]);

  function findSourceColumn(productId: number): ColumnType {
    if (cardsState.available.some((p) => p.id === productId))
      return "available";
    if (cardsState.selected.some((p) => p.id === productId)) return "selected";
    return "favorites";
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const product = active.data.current?.product;
    if (!product) return;

    const sourceColumn = findSourceColumn(product.id);
    const targetColumn = over.id as ColumnType;

    if (sourceColumn === targetColumn) return;

    setCardsState((prev) => {
      const newState = { ...prev };

      newState[sourceColumn] = prev[sourceColumn].filter(
        (p) => p.id !== product.id
      );

      newState[targetColumn] = [...prev[targetColumn], product];

      return newState;
    });
  }

  return {
    cardsState,
    handleDragEnd,
    sensors,
    isLoading,
    error,
    refetch,
  };
}
