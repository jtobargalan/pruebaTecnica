import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../HomeScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Tasks: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const mockNavigate = jest.fn();

const createTestProps = (props: Partial<Props>) =>
  ({
    navigation: { navigate: mockNavigate } as any,
    route: {} as any,
    ...props,
  } as Props);

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both buttons", () => {
    const props = createTestProps({});
    const { getByText } = render(<HomeScreen {...props} />);

    expect(getByText("Task")).toBeTruthy();
    expect(getByText("List")).toBeTruthy();
  });

  it("navigates to Tasks when Task button is pressed", () => {
    const props = createTestProps({});
    const { getByText } = render(<HomeScreen {...props} />);

    fireEvent.press(getByText("Task"));
    expect(mockNavigate).toHaveBeenCalledWith("Tasks");
  });

  it("navigates to List when List button is pressed", () => {
    const props = createTestProps({});
    const { getByText } = render(<HomeScreen {...props} />);

    fireEvent.press(getByText("List"));
    expect(mockNavigate).toHaveBeenCalledWith("List");
  });
});
