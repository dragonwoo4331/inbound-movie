import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Paper, Title, Text, Alert, Button, Loader, AppShell, Group } from '@mantine/core'
import { authService } from '../../services/authService'
import { useEffect } from 'react'

function VerifyEmailPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setError('無効な認証リンクです。')
      setLoading(false)
      return
    }

    const verifyEmail = async () => {
      try {
        await authService.verifyEmail(token)
        setSuccess(true)
      } catch (err: any) {
        setError(err.message || 'メール認証に失敗しました。')
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [searchParams])

  const handleLoginRedirect = () => {
    navigate('/login')
  }

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
            <Text fw={700} size="xl" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              🎬 Movie Finder
            </Text>
            <Group gap="sm">
              <Button variant="subtle" size="sm" onClick={() => navigate('/login')}>
                ログイン
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                会員登録
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size={420} my={40}>
          <Title ta="center" c="white" mb="xl">メール認証</Title>

          <Paper
            withBorder
            shadow="md"
            p={30}
            radius="md"
            style={{ backgroundColor: '#020617', borderColor: '#374151' }}
          >
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <Loader size="lg" mb="md" />
                <Text c="gray.3">メールを認証中...</Text>
              </div>
            )}

            {error && (
              <Alert color="red" mb="md">
                {error}
              </Alert>
            )}

            {success && (
              <>
                <Alert color="green" mb="md">
                  メール認証が完了しました！ ログインできます。
                </Alert>
                <Button fullWidth onClick={handleLoginRedirect}>
                  ログインページへ移動
                </Button>
              </>
            )}
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default VerifyEmailPage