import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-lg font-black text-slate-900">Une erreur inattendue est survenue</h2>
            <p className="text-sm text-slate-500">
              Vos données sont sauvegardées localement. Rechargez la page pour continuer.
            </p>
            <p className="text-xs font-mono text-red-400 bg-red-50 px-3 py-2 rounded-lg text-left break-all">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-xl bg-cpme-blue text-white font-bold text-sm hover:bg-cpme-lightblue transition-colors"
            >
              Recharger la page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
