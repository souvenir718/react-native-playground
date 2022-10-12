import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Votes from "../components/Votes";

const API_KEY = "ffe228ac6463158a2c4230ff91248853";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.ScrollView``;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
`;
const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;
const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const HMovie = styled.View`
  padding: 0px 20px;
  margin-bottom: 30px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 70%;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 100%;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpComing(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  const onRefresh = async() => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
    >
      <Swiper
        horizontal
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
        loop
        showsButtons={false}
        autoplay
        autoplayTimeout={3.5}
        showsPagination={false}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 12)}
                {movie.original_title.length > 12 ? "..." : null}
              </Title>
              <Votes votes={movie.vote_average}/>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {upComing.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 140
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};
export default Movies;
