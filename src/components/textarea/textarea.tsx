import { forwardRef, TextareaHTMLAttributes, useId, useState, FocusEvent } from "react";
import './textarea.css'

interface TextAreaTypes extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaTypes>(
  ({
    label,
    error,
    hint,
    id,
    onBlur,
    ...rest
  }, ref) => {
  const [ hintVisible, setHintVisible ] = useState<boolean>(false)

  const generatedId = useId();
  const textId = id ?? generatedId;

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setHintVisible(false)
    onBlur?.(e);
  }

  return (
    <div className="textarea">
      <label className="textarea__label" htmlFor={textId}>{label}</label>
      <textarea
        className={`textarea__field ${error ? 'textarea__field--error' : ""}`}
        ref={ref}
        onFocus={() => setHintVisible(true)}
        onMouseEnter={() => setHintVisible(true)}
        onMouseLeave={() => setHintVisible(false)}
        {...rest}
        id={textId}
        onBlur={handleBlur}
        aria-describedby={`${textId}-hint`}
        aria-invalid={!!error}
      ></textarea>
      {
        error && (
          <span
            className='textarea__error'
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
        className={`textarea__hint ${hintVisible ? 'textarea__hint--active' : ''}`}
        aria-hidden={!hintVisible}
        id={`${textId}-hint`}
      >
        {hint}
      </span>
    </div>
  )
});

export { Textarea }