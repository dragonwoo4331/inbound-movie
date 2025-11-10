import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Title, Card, Image, Text, Badge, Group, ActionIcon, Grid, AppShell, Box, Button } from '@mantine/core'
import { FaHeart } from 'react-icons/fa'
import { useStore, useAuthStore } from '../store/movieStore'
import { favoritesService } from '../services/favoritesService'
import { useEffect } from 'react'

function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites, setFavorites } = useStore()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites()
    }
  }, [isAuthenticated])

  const loadFavorites = async () => {
    try {
      const data = await favoritesService.getFavorites()
      if (Array.isArray(data)) {
        setFavoriteMovies(data)
        setFavorites(data.map((fav) => fav.movie.imdbID))
      } else {
        console.error('Favorites data is not an array:', data)
        setFavoriteMovies([])
        setFavorites([])
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
      setFavoriteMovies([])
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFavorite = async (movieId: string) => {
    if (!isAuthenticated) {
      return
    }

    try {
      const isFavorite = favorites.includes(movieId)
      if (isFavorite) {
        await favoritesService.removeFavorite(movieId)
        setFavorites(favorites.filter((id) => id !== movieId))
        setFavoriteMovies(favoriteMovies.filter((fav) => fav.movie.imdbID !== movieId))
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading) {
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
            </Group>
          </Container>
        </AppShell.Header>
        <AppShell.Main>
          <Container size="lg">
            <Text c="gray.3" ta="center" py="xl">로딩 중...</Text>
          </Container>
        </AppShell.Main>
      </AppShell>
    )
  }

  if (!isAuthenticated) {
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
                  회원가입
                </Button>
              </Group>
            </Group>
          </Container>
        </AppShell.Header>
        <AppShell.Main>
          <Container size="lg">
            <Text c="gray.3" ta="center" py="xl">ログインが必要です。</Text>
          </Container>
        </AppShell.Main>
      </AppShell>
    )
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
              <Text size="sm">안녕하세요, {user?.name} 님</Text>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="xl">
          <Title order={1} c="white" mb="xl">お気に入り</Title>

          {favoriteMovies.length === 0 ? (
            <Text c="gray.3" ta="center" py="xl">
              お気に入りの映画がありません。
            </Text>
          ) : (
            <Grid gutter="lg" mt="md">
              {favoriteMovies.map((favorite) => (
                <Grid.Col key={favorite.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card
                    radius="md"
                    withBorder
                    style={{
                      overflow: 'hidden',
                      backgroundColor: '#020617',
                      height: '100%',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Card.Section>
                      <Box component={Link} to={`/movies/${favorite.movie.imdbID}`} style={{ display: 'block' }}>
                        <Image
                          src={favorite.movie.Poster !== 'N/A' ? favorite.movie.Poster : undefined}
                          alt={favorite.movie.Title}
                          height={300}
                          fit="cover"
                          style={{ width: '100%' }}
                          fallbackSrc="https://via.placeholder.com/300x445?text=No+Image"
                        />
                      </Box>
                    </Card.Section>

                    <Group justify="space-between" mt="sm" align="flex-start">
                      <Box style={{ flex: 1, overflow: 'hidden' }}>
                        <Text fw={600} c="white" style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {favorite.movie.Title}
                        </Text>
                        <Group gap="xs" mt={4}>
                          <Badge size="sm" color="blue" variant="light">
                            {favorite.movie.Year}
                          </Badge>
                          <Badge size="sm" color="gray" variant="outline">
                            {favorite.movie.Type}
                          </Badge>
                        </Group>
                      </Box>

                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={(e) => {
                          e.preventDefault()
                          handleToggleFavorite(favorite.movie.imdbID)
                        }}
                      >
                        <FaHeart size={20} />
                      </ActionIcon>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default FavoritesPage