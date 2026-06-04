import { forwardRef, InputHTMLAttributes, useId, useState, FocusEvent } from 'react';
import "./input.css";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
}

const Input = forwardRef<HTMLInputElement, IInput>(
({ label, error, hint, id, onBlur, ...rest}, ref) => {
    const [ hintVisible, setHintVisible ] = useState<boolean>(false);

    const generatedId = useId();
    const inputId = id ?? generatedId;

    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        setHintVisible(false)
        onBlur?.(e)
    }

    return (
        <div
            className='input'
        >
            <label className='input__label' htmlFor={inputId}>{label}</label>
            <input
                className={`input__field ${error ? 'input__field--error' : ''}`}
                onMouseEnter={() => setHintVisible(true)}
                onMouseLeave={() => setHintVisible(false)}
                onFocus={() => setHintVisible(true)}
                ref={ref}
                {...rest}
                onBlur={handleBlur}
                id={inputId}
                aria-describedby={`${inputId}-hint`}
                aria-invalid={!!error}
            />
            {
                error && (
                    <span
                        className='input__error'
                        role='alert'
                    >
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 5 L90 90 H10 L50 5 Z" fill="white" stroke="#E53935" strokeWidth="8" strokeLinejoin="round"/>
                            <path d="M50 30 V55 M50 70 V75" stroke="#E53935" strokeWidth="8" strokeLinecap="round"/>
                        </svg>
                        {error}
                    </span>
                )
            }
            <span
                className={`input__hint ${hintVisible ? 'input__hint--active' : ''}`}
                aria-hidden={!hintVisible}
                id={`${inputId}-hint`}
            >
                {hint}
            </span>
        </div>
    )
});


export { Input }
