import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppShell, Container, Title, Text, TextInput, Grid, Card, Image, Badge, Group, ActionIcon, Button, Flex, Loader } from '@mantine/core'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useStore, useAuthStore } from '../store/movieStore'
import { searchMovies, getTopRatedMovies } from '../services/movieService'
import { favoritesService } from '../services/favoritesService'
import { UI_CONSTANTS } from '../shared/constants'
import { storage } from '../shared/utils'

function HomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { movies, favorites, setMovies, setFavorites } = useStore()
  const { isAuthenticated, user, logout } = useAuthStore()

  const loadTopRated = async (): Promise<void> => {
    try {
      setLoading(true)
      setError('')
      const topMovies = await getTopRatedMovies(UI_CONSTANTS.TOP_RATED_MOVIES_LIMIT)
      setMovies(Array.isArray(topMovies) ? topMovies : [])
    } catch (error) {
      console.error('Error fetching top rated movies:', error)
      setError(error instanceof Error ? error.message : UI_CONSTANTS.SEARCH_ERROR)
    } finally {
      setLoading(false)
    }
  }

  // 첫 진입 시: 검색어 상태 복원 또는 TOP 12 로딩
  useEffect(() => {
    const savedQuery = storage.getSession(UI_CONSTANTS.SESSION_STORAGE_SEARCH_KEY)
    if (savedQuery) {
      setSearchQuery(savedQuery)
    } else {
      loadTopRated()
    }
  }, [])

  // 검색어 변경 시: 있으면 검색, 없으면 다시 TOP 12
  useEffect(() => {
    const q = searchQuery.trim()

    const timeoutId = window.setTimeout(async () => {
      if (q.length === 0) {
        // 검색어 없으면 다시 TOP 12
        await loadTopRated()
        return
      }

      try {
        setLoading(true)
        setError('')
        const data = await searchMovies(q)
        if (data && Array.isArray(data.Search)) {
          setMovies(data.Search)
          if (data.Search.length === 0) {
            setError(UI_CONSTANTS.NO_RESULTS_TEXT)
          }
        } else {
          setMovies([])
          setError(UI_CONSTANTS.NO_RESULTS_TEXT)
        }
      } catch (error) {
        console.error(error)
        setError(UI_CONSTANTS.SEARCH_ERROR)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }, UI_CONSTANTS.SEARCH_DEBOUNCE_DELAY)

    return () => window.clearTimeout(timeoutId)
  }, [searchQuery])

  // 검색어 변경 시 sessionStorage에 저장
  useEffect(() => {
    if (searchQuery.trim()) {
      storage.setSession(UI_CONSTANTS.SESSION_STORAGE_SEARCH_KEY, searchQuery.trim())
    } else {
      storage.removeSession(UI_CONSTANTS.SESSION_STORAGE_SEARCH_KEY)
    }
  }, [searchQuery])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return
      try {
        const data = await favoritesService.getFavorites()
        setFavorites(data.map((f) => f.movie.imdbID))
      } catch {
        // 에러는 조용히 무시
      }
    }
    fetchFavorites()
  }, [isAuthenticated, setFavorites])

  const handleToggleFavorite = async (imdbID: string): Promise<void> => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const isFav = favorites.includes(imdbID)
    try {
      if (isFav) {
        await favoritesService.removeFavorite(imdbID)
        setFavorites(favorites.filter((id) => id !== imdbID))
      } else {
        await favoritesService.addFavorite(imdbID)
        setFavorites([...favorites, imdbID])
      }
    } catch {
      setError(UI_CONSTANTS.FAVORITE_PROCESS_ERROR)
    }
  }

  const handleLogout = (): void => {
    logout()
    navigate('/')
  }

  return (
    <AppShell
      padding="md"
      header={{ height: 64 }}
      styles={{
        main: {
          background:
            'radial-gradient(circle at top, #1d4ed8 0, #020617 50%, #020617 100%)',
          minHeight: '100vh',
        },
      }}
    >
      <AppShell.Header>
        <Container size="lg" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Group justify="space-between" w="100%">
            <Text fw={700} size="xl" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              {UI_CONSTANTS.MOVIE_APP_TITLE}
            </Text>
            <Group gap="sm">
              <Button variant="subtle" size="sm" onClick={() => navigate('/favorites')}>
                {UI_CONSTANTS.FAVORITES_BUTTON}
              </Button>
              {isAuthenticated ? (
                <>
                  <Text size="sm">안녕하세요, {user?.name} 님</Text>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    {UI_CONSTANTS.LOGOUT_BUTTON}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="subtle" size="sm" onClick={() => navigate('/login')}>
                    {UI_CONSTANTS.LOGIN_BUTTON}
                  </Button>
                  <Button size="sm" onClick={() => navigate('/register')}>
                    {UI_CONSTANTS.REGISTER_BUTTON}
                  </Button>
                </>
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="xl">
            {/* 히어로 섹션 */}
            <Flex direction="column" gap="md" align="flex-start" mb="lg">
              <Title order={1} c="white">
                {UI_CONSTANTS.HERO_TITLE}
              </Title>
              <Text c="gray.2">
                タイトルで検索して好きな映画を見つけ、心に響く作品はハートでお気に入りに保存できます。
              </Text>
              <TextInput
                placeholder={UI_CONSTANTS.SEARCH_PLACEHOLDER}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                size="lg"
                radius="xl"
                rightSection={loading ? <Loader size="sm" /> : undefined}
              />
            </Flex>

            {error && (
              <Text c="red.3" mb="sm">
                {error}
              </Text>
            )}

            {/* 영화 카드 그리드 */}
            <Grid gutter="lg" mt="md">
              {Array.isArray(movies) && movies.map((movie, index) => (
                <Grid.Col
                  key={movie.imdbID}
                  span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                >
                  <Card
                    radius="md"
                    withBorder
                    style={{
                      overflow: 'hidden',
                      backgroundColor: '#020617',
                      height: '100%',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer',
                      position: 'relative'
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
                    {/* 랭킹 번호 */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: '#fbbf24',
                      color: '#000',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10
                    }}>
                      {index + 1}
                    </div>
                    <Card.Section>
                      <Link
                        to={`/movies/${movie.imdbID}`}
                        style={{ display: 'block' }}
                      >
                        <Image
                          src={movie.Poster !== UI_CONSTANTS.POSTER_NOT_AVAILABLE ? movie.Poster : undefined}
                          alt={movie.Title}
                          height={300}
                          fit="cover"
                          style={{ width: '100%' }}
                          fallbackSrc={UI_CONSTANTS.DEFAULT_POSTER}
                        />
                      </Link>
                    </Card.Section>

                    <Group justify="space-between" mt="sm" align="flex-start">
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <Text fw={600} c="white" style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {movie.Title}
                        </Text>
                        <Group gap="xs" mt={4}>
                          <Badge size="sm" color="blue" variant="light">
                            {movie.Year}
                          </Badge>
                          <Badge size="sm" color="gray" variant="outline">
                            {UI_CONSTANTS.MOVIE_TYPE_MOVIE}
                          </Badge>
                          {movie.imdbRating && (
                            <Badge size="sm" color="yellow" variant="light">
                              ⭐ {movie.imdbRating}
                            </Badge>
                          )}
                        </Group>
                      </div>

                      <ActionIcon
                        variant="subtle"
                        aria-label="お気に入り"
                        onClick={() => handleToggleFavorite(movie.imdbID)}
                      >
                        {favorites.includes(movie.imdbID) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                      </ActionIcon>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>

            {!loading && Array.isArray(movies) && movies.length === 0 && !error && searchQuery.trim() !== '' && (
              <Text c="gray.3" ta="center" mt="xl">
                검색 결과가 없습니다.
              </Text>
            )}

            {!loading && Array.isArray(movies) && movies.length === 0 && !error && searchQuery.trim() === '' && (
              <Text c="gray.3" ta="center" mt="xl">
                {UI_CONSTANTS.LOADING_TOP_RATED_TEXT}
              </Text>
            )}
          </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default HomePage
