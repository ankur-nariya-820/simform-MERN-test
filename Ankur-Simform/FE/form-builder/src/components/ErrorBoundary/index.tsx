import React from "react";

type ErrorBoundaryProps = {
  fallback: any;
  name?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  eventId: string | null;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      eventId: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log("Page errors", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      //render fallback UI
      const Fallback = this.props.fallback;

      return <Fallback eventId={this.state.eventId} name={this.props.name} />;
    }

    //when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
