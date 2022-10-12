import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

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
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
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

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
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
              data={trending}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={() => <View style={{ width: 20 }}></View>}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upComing}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};
export default Movies;
