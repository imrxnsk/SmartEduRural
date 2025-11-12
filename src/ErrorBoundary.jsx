import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#b91c1c' }}>Something went wrong rendering the app.</h1>
          <p style={{ marginTop: 8 }}>Please share this error message:</p>
          <pre style={{ marginTop: 12, padding: 12, background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 8, whiteSpace: 'pre-wrap' }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;




