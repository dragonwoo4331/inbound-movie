import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Paper, TextInput, PasswordInput, Button, Title, Text, Alert, AppShell, Group } from '@mantine/core'
import { authService } from '../../services/authService'

function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await authService.register({ email, password, name })
      setSuccess('会員登録が完了しました。メールを確認してください。')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || '会員登録に失敗しました。')
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
              <Button variant="subtle" size="sm" onClick={() => navigate('/login')}>
                ログイン
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size={420} my={40}>
          <Title ta="center" c="white" mb="xl">会員登録</Title>

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

            {success && (
              <Alert color="green" mb="md" style={{ color: 'white', backgroundColor: '#16a34a' }}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextInput
                label="名前"
                placeholder="名前を入力してください"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb="md"
                styles={{
                  input: { backgroundColor: '#111827', borderColor: '#374151', color: 'white' },
                  label: { color: 'white' }
                }}
              />

              <TextInput
                label="メール"
                placeholder="your@email.com"
                required
                type="email"
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
                placeholder="パスワードを入力してください (最小6文字)"
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
                会員登録
              </Button>
            </form>

            <Text size="sm" ta="center" mt="md" c="gray.3">
              すでにアカウントをお持ちですか？ <Link to="/login" style={{ color: '#60a5fa' }}>ログイン</Link>
            </Text>
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default RegisterPage

