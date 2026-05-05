import { ButtonHTMLAttributes, forwardRef } from "react"
import "./button.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary" | "ghost";
    size: "sm" | "md" | "lg";
    loadingLabel?: string;
    isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, size, children, isLoading = false, loadingLabel, disabled, type = 'button', ...rest }, ref) => {

    const isDisabled = disabled || isLoading;
    const label = loadingLabel ?? "Loading..."

    return (
        <button
            ref={ref}
            className={`btn btn--${variant} btn--${size}`}
            disabled={isDisabled}
            type={type}
            {...rest}
            aria-busy={isLoading}
        >
            {
                <>
                    {
                        isLoading && (
                            <span className="sr-only">{label}</span>
                        )
                    }
                    <span className="button__children" aria-hidden={isLoading}>
                        {isLoading && (
                            <span className="spinner"></span>
                        )}
                        {children}
                    </span>
                </>
            }
        </button>
    )
})

export { Button };

// Here's what this task covered:

// ButtonHTMLAttributes vs HTMLAttributes — always extend the most specific type
// forwardRef — required for any reusable component that consumers may need to control or measure
// Prop spread ordering — controlled values that must not be overridden go after {...rest}
// aria-busy vs aria-hidden — aria-busy signals "wait", aria-hidden controls visibility; they serve different purposes and aren't substitutes
// sr-only pattern — visually hide content while keeping it in the accessibility tree
// BEM naming — prevents class collisions as the codebase grows
// display: inline-flex — correct default for button internals
// type="button" default — prevents accidental form submission