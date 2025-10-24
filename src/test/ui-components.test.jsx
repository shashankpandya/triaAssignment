import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<Button loading>Loading...</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});

describe("Input Component", () => {
  it("renders input with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("handles value changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input label="Name" onChange={handleChange} />);

    const input = screen.getByLabelText(/name/i);
    await user.type(input, "John");

    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error message", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(<Input label="Email" required />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute("aria-required", "true");
  });
});

describe("Modal Component", () => {
  it("renders when open", () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        Modal content
      </Modal>
    );

    const closeButton = screen.getByLabelText(/close modal/i);
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
