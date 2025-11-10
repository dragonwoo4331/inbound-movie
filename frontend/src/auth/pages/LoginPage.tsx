import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Paper, TextInput, PasswordInput, Button, Title, Text, Alert, AppShell, Group } from '@mantine/core'
import { useAuthStore } from '../../store/movieStore'
import { authService } from '../../services/authService'

function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      setUser(response.user)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'ログインに失敗しました。')
    } finally {
      setLoading(false)
    }
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
              <Button variant="subtle" size="sm" onClick={() => navigate('/register')}>
                会員登録
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size={420} my={40}>
          <Title ta="center" c="white" mb="xl">ログイン</Title>

          <Paper
            withBorder
            shadow="md"
            p={30}
            radius="md"
            style={{ backgroundColor: '#020617', borderColor: '#374151' }}
          >
            {error && (
              <Alert color="red" mb="md" style={{ color: 'white', backgroundColor: '#dc2626' }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextInput
                label="メール"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb="md"
                styles={{
                  input: { backgroundColor: '#111827', borderColor: '#374151', color: 'white' },
                  label: { color: 'white' }
                }}
              />

              <PasswordInput
                label="パスワード"
                placeholder="パスワードを入力してください"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb="md"
                styles={{
                  input: { backgroundColor: '#111827', borderColor: '#374151', color: 'white' },
                  label: { color: 'white' }
                }}
              />

              <Button fullWidth type="submit" loading={loading}>
                ログイン
              </Button>
            </form>

            <Text size="sm" ta="center" mt="md" c="gray.3">
              アカウントをお持ちですか？ <Link to="/register" style={{ color: '#60a5fa' }}>会員登録</Link>
            </Text>
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default LoginPage

