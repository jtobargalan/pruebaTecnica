import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ListScreen from "../ListScreen";

const mockData = [
  { id: "1", name: "Elemento 1", avatar: "https://example.com/avatar1.png" },
  { id: "2", name: "Elemento 2", avatar: "https://example.com/avatar2.png" },
];

describe("ListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra el loading inicialmente", () => {
    const { getByText } = render(<ListScreen />);
    expect(getByText("Cargando elementos...")).toBeTruthy();
  });

  it("muestra los elementos cuando fetch es exitoso", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as any)
    );

    const { getByText, queryByText } = render(<ListScreen />);
    await waitFor(() => {
      expect(queryByText("Cargando elementos...")).toBeNull();
    });

    mockData.forEach((item) => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it("muestra un mensaje de error si fetch falla", async () => {
    globalThis.fetch = jest.fn(() => Promise.reject(new Error("Error de red")));

    const { getByText } = render(<ListScreen />);

    await waitFor(() => {
      expect(getByText("Error de red")).toBeTruthy();
    });
  });

  it("muestra un mensaje de error si la respuesta no es ok", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({ ok: false } as any)
    );

    const { getByText } = render(<ListScreen />);

    await waitFor(() => {
      expect(getByText("Error en la respuesta del servidor")).toBeTruthy();
    });
  });
});
