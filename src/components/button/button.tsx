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

