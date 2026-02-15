import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputText } from "..";
describe("InputText", () => {
  it("deve renderizar com label e input", () => {
    render(<InputText label="Nome" />);

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("deve renderizar sem label quando não fornecido", () => {
    render(<InputText placeholder="digite..." />);

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("digite...")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro", () => {
    render(<InputText label="Nome" error="Campo obrigatório" />);

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("não deve exibir erro quando error é undefined", () => {
    render(<InputText label="Nome" />);

    expect(screen.queryByText("Campo obrigatório")).not.toBeInTheDocument();
  });

  it("deve marcar o label como required", () => {
    render(<InputText label="Nome" required />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("deve forçar type=text no input", () => {
    render(<InputText label="Nome" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("deve repassar props nativas do input", async () => {
    const user = userEvent.setup();
    render(<InputText label="Nome" placeholder="Ex: João" />);

    const input = screen.getByPlaceholderText("Ex: João");
    await user.type(input, "Maria");

    expect(input).toHaveValue("Maria");
  });

  it("deve expor ref para o elemento input", () => {
    let inputRef: HTMLInputElement | null = null;

    render(
      <InputText
        label="Nome"
        ref={(el) => {
          inputRef = el;
        }}
      />,
    );

    expect(inputRef).toBeInstanceOf(HTMLInputElement);
    expect(inputRef!.type).toBe("text");
  });

  it("deve aplicar estilo de erro no input quando error é fornecido", () => {
    render(<InputText label="Nome" error="Erro aqui" />);

    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-status-lost-text");
  });

  it("deve associar label ao input via htmlFor/id", () => {
    render(<InputText label="Nome" id="meu-nome" />);

    const label = screen.getByText("Nome");
    const input = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "meu-nome");
    expect(input).toHaveAttribute("id", "meu-nome");
  });
});
