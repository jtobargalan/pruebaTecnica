import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TasksScreen from "../TasksScreen";

import { useSelector } from "react-redux";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../../components/TaskModal", () => {
  const { View, Text } = require("react-native");
  return ({ visible, onClose }: any) =>
    <View>{visible ? <Text>Modal Visible</Text> : null}</View>;
});

describe("TasksScreen", () => {
  const mockedUseSelector = useSelector as unknown as jest.Mock;

  const mockTasks = [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra el botón Agregar nuevo task", () => {
    mockedUseSelector.mockReturnValue([]); 
    const { getByText } = render(<TasksScreen />);
    expect(getByText("Agregar nuevo task")).toBeTruthy();
  });

  it("muestra la lista vacía si no hay tasks", () => {
    mockedUseSelector.mockReturnValue([]); 
    const { getByText } = render(<TasksScreen />);
    expect(getByText("No hay tasks aún")).toBeTruthy();
  });

  it("muestra las tasks si hay datos", () => {
    mockedUseSelector.mockReturnValue(mockTasks); 
    const { getByText } = render(<TasksScreen />);
    mockTasks.forEach((task) => {
      expect(getByText(task.title)).toBeTruthy();
    });
  });

  it("abre el TaskModal al presionar el botón", () => {
    mockedUseSelector.mockReturnValue([]);
    const { getByText } = render(<TasksScreen />);
    fireEvent.press(getByText("Agregar nuevo task"));
    expect(getByText("Modal Visible")).toBeTruthy();
  });
});
