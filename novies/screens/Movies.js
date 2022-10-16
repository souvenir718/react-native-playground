import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = ({ navigation: { navigate } }) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefresing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    ["movies", "upcoming"],
    moviesApi.upcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );

  const onRefresh = async () => {
    setRefresing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefresing(false);
  };

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = (item) => item.id;
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
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
            {nowPlayingData.results.map((movie) => (
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
          <HList title="Trending Movies" data={trendingData.results} />
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
  );
};
export default Movies;
