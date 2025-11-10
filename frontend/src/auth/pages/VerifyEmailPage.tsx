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
      setError('유효하지 않은 인증 링크입니다.')
      setLoading(false)
      return
    }

    const verifyEmail = async () => {
      try {
        await authService.verifyEmail(token)
        setSuccess(true)
      } catch (err: any) {
        setError(err.message || '이메일 인증에 실패했습니다.')
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
                로그인
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                회원가입
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size={420} my={40}>
          <Title ta="center" c="white" mb="xl">이메일 인증</Title>

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
                <Text c="gray.3">이메일을 인증하는 중...</Text>
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
                  이메일 인증이 완료되었습니다! 이제 로그인할 수 있습니다.
                </Alert>
                <Button fullWidth onClick={handleLoginRedirect}>
                  로그인 페이지로 이동
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