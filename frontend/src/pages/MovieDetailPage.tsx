import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Title, Image, Text, Badge, Group, Button, ActionIcon, Stack, AppShell, Box, Flex } from '@mantine/core'
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa'
import { useStore, useAuthStore } from '../store/movieStore'
import { getMovieById } from '../services/movieService'
import { favoritesService } from '../services/favoritesService'
import { useEffect } from 'react'

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>()
  const navigate = useNavigate()
  const { favorites, setFavorites } = useStore()
  const { isAuthenticated } = useAuthStore()
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (movieId) {
      getMovieById(movieId)
        .then((data) => {
          setMovie(data)
        })
        .catch((error) => {
          console.error('Error fetching movie:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [movieId])

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

  if (!movie) {
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
            <Text c="gray.3" ta="center" py="xl">영화를 찾을 수 없습니다.</Text>
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
              <Button variant="subtle" size="sm" onClick={() => navigate('/favorites')}>
                お気に入り
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="xl">
          <Button
            leftSection={<FaArrowLeft />}
            variant="subtle"
            mb="xl"
            onClick={() => navigate(-1)}
          >
            뒤로 가기
          </Button>

          <Flex gap="xl" align="flex-start" direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Image
                src={movie.Poster !== 'N/A' ? movie.Poster : undefined}
                alt={movie.Title}
                w={300}
                radius="md"
                style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
                fallbackSrc="https://via.placeholder.com/300x445?text=No+Image"
              />
            </Box>

            <Stack flex={1} gap="md">
              <Group justify="space-between" align="flex-start">
                <Title order={1} c="white">{movie.Title}</Title>
                <ActionIcon
                  variant="subtle"
                  color={favorites.includes(movie.imdbID) ? 'red' : 'gray'}
                  size="lg"
                  onClick={async () => {
                    if (!isAuthenticated) {
                      navigate('/login')
                      return
                    }
                    try {
                      const isFavorite = favorites.includes(movie.imdbID)
                      if (isFavorite) {
                        await favoritesService.removeFavorite(movie.imdbID)
                        setFavorites(favorites.filter((id) => id !== movie.imdbID))
                      } else {
                        await favoritesService.addFavorite(movie.imdbID)
                        setFavorites([...favorites, movie.imdbID])
                      }
                    } catch (error) {
                      console.error('Error toggling favorite:', error)
                    }
                  }}
                >
                  {favorites.includes(movie.imdbID) ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </ActionIcon>
              </Group>

              <Group>
                <Badge size="lg" color="blue" variant="light">{movie.Year}</Badge>
                <Badge size="lg" color="green" variant="light">{movie.Type}</Badge>
                <Badge size="lg" color="orange" variant="light">{movie.Rated}</Badge>
              </Group>

              <Box>
                <Text size="lg" fw={600} c="white" mb="xs">あらすじ</Text>
                <Text c="gray.2">{movie.Plot !== 'N/A' ? movie.Plot : 'あらすじ情報がありません。'}</Text>
              </Box>

              <Box>
                <Text size="lg" fw={600} c="white" mb="xs">감독</Text>
                <Text c="gray.2">{movie.Director !== 'N/A' ? movie.Director : '정보 없음'}</Text>
              </Box>

              <Box>
                <Text size="lg" fw={600} c="white" mb="xs">출연</Text>
                <Text c="gray.2">{movie.Actors !== 'N/A' ? movie.Actors : '정보 없음'}</Text>
              </Box>

              <Box>
                <Text size="lg" fw={600} c="white" mb="xs">장르</Text>
                <Text c="gray.2">{movie.Genre !== 'N/A' ? movie.Genre : '정보 없음'}</Text>
              </Box>

              <Box>
                <Text size="lg" fw={600} c="white" mb="xs">評価</Text>
                <Text c="gray.2">{movie.imdbRating !== 'N/A' ? `${movie.imdbRating} / 10` : '評価なし'}</Text>
              </Box>
            </Stack>
          </Flex>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default MovieDetailPage

