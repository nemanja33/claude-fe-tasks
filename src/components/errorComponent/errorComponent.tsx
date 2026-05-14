import { ReactNode } from 'react';
import './error.css';
import { ErrorBoundary } from 'react-error-boundary';

interface ErrorType {
  children: ReactNode
}

const fallback = <span className="error">Something went wrong! Please try a bit later!</span>

const ErrorComponent = ({
  children
}: ErrorType) => {
  return (
    <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
  )
};

export default ErrorComponent;