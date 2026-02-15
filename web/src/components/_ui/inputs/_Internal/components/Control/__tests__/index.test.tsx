import { describe, expect, it } from "vitest";
import { InternalInputControl } from "..";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("InternalInputControl", () => {
  it("deve renderizar um input", () => {
    render(<InternalInputControl />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("deve aceitar digitação do usuário", async () => {
    const user = userEvent.setup();
    render(<InternalInputControl />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  it("deve repassar placeholder", () => {
    render(<InternalInputControl placeholder="Digite aqui..." />);

    expect(screen.getByPlaceholderText("Digite aqui...")).toBeInTheDocument();
  });

  it("deve suportar estado disabled", () => {
    render(<InternalInputControl disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("deve aplicar classe de erro quando hasError=true", () => {
    render(<InternalInputControl hasError />);

    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-status-lost-text");
  });

  it("não deve aplicar classe de erro quando hasError=false", () => {
    render(<InternalInputControl hasError={false} />);

    const input = screen.getByRole("textbox");
    expect(input.className).not.toContain("border-status-lost-text");
  });

  it("deve aceitar ref via forwardRef", () => {
    let inputRef: HTMLInputElement | null = null;

    render(
      <InternalInputControl
        ref={(el) => {
          inputRef = el;
        }}
      />,
    );

    expect(inputRef).toBeInstanceOf(HTMLInputElement);
  });
});
