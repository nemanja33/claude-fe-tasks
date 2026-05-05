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
            {
                <span
                    className={`input__hint ${hintVisible ? 'input__hint--active' : ''}`}
                    aria-hidden={!hintVisible}
                    id={`${inputId}-hint`}
                >
                    {hint}
                </span>
            }
        </div>
    )
});


export { Input }

// What Task 2 covered
// useId() — React 18's solution for stable, unique IDs per component instance; essential for label association in reusable components
// htmlFor / id pairing — the correct programmatic way to associate labels with inputs (vs wrapping, which is less robust)
// aria-describedby — how to point an element at supplementary descriptive text, and that the referenced element must be in the accessibility tree (display: none breaks it, visibility: hidden doesn't)
// aria-invalid — signals field error state persistently, independent of whether the error message is visible
// role="alert" — triggers immediate screen reader announcement when content appears in the DOM
// Template literal pitfalls — ${false} and ${null} produce literal strings, always use ternaries with '' as the falsy branch
// Consumer ID override pattern — id ?? generatedId lets consumers control IDs when needed (e.g. for testing or external label association)