import { Component, useState } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./ui/Button";

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 *
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Optional: Send to error tracking service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Something went wrong
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-center mb-6">
              We're sorry for the inconvenience. An unexpected error has
              occurred.
            </p>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 rounded-md">
                <p className="text-sm font-mono text-red-600 mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs font-mono text-gray-600">
                    <summary className="cursor-pointer hover:text-gray-900">
                      Stack trace
                    </summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={this.handleReset}
                className="w-full"
              >
                Try again
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Reload page
              </Button>
            </div>

            {/* Support link */}
            {this.props.supportEmail && (
              <p className="text-sm text-gray-500 text-center mt-6">
                If the problem persists, contact{" "}
                <a
                  href={`mailto:${this.props.supportEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  support
                </a>
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

/**
 * Hook version for function components (simplified error display)
 * For full error boundary, use the class component above
 */
export function useErrorHandler() {
  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  const handleError = (error) => {
    console.error("Error caught:", error);
    setError(error);
  };

  return { error, handleError, resetError };
}
