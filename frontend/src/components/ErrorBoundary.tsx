import React, { Component, ReactNode } from 'react'
import { Container, Title, Text, Button, Stack, AppShell, Group } from '@mantine/core'
import { FaRedo, FaHome } from 'react-icons/fa'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <AppShell
          padding="md"
          header={{ height: 64 }}
          styles={{
            main: {
              background: 'radial-gradient(circle at top, #1d4ed8 0, #020617 50%, #020617 100%)',
              minHeight: '100vh',
            },
          }}
        >
          <AppShell.Header>
            <Container size="lg" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Group justify="space-between" w="100%">
                <Text fw={700} size="xl" style={{ cursor: 'pointer' }} onClick={this.handleGoHome}>
                  🎬 Movie Finder
                </Text>
              </Group>
            </Container>
          </AppShell.Header>

          <AppShell.Main>
            <Container size="md" py="xl">
              <Stack align="center" gap="xl">
                <Title order={1} c="white" ta="center">
                  申し訳ありません
                </Title>
                <Text c="gray.2" size="lg" ta="center">
                  予期しないエラーが発生しました。
                </Text>
                <Text c="gray.3" ta="center">
                  ページを再読み込みするか、ホームページに戻ってください。
                </Text>

                <Group gap="md">
                  <Button
                    leftSection={<FaRedo />}
                    onClick={this.handleRetry}
                    variant="filled"
                  >
                    再試行
                  </Button>
                  <Button
                    leftSection={<FaHome />}
                    onClick={this.handleGoHome}
                    variant="outline"
                  >
                    ホームへ戻る
                  </Button>
                </Group>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details style={{ width: '100%', marginTop: '2rem' }}>
                    <summary style={{ color: '#9ca3af', cursor: 'pointer', marginBottom: '1rem' }}>
                      エラー詳細 (開発モード)
                    </summary>
                    <pre
                      style={{
                        backgroundColor: '#1f2937',
                        color: '#ef4444',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        overflow: 'auto',
                        fontSize: '0.875rem',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}
              </Stack>
            </Container>
          </AppShell.Main>
        </AppShell>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary