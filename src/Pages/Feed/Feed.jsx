//react import
import React, { useState, useEffect, useMemo } from "react";
import instance from "../../Redux/modules/instance";
import { useInView } from "react-intersection-observer";
//components import
import Medal from "./Medal";
import ClapIcon from "../../static/components/clap";
import FeedSkeleton from "../../Components/Skeleton/FeedSkeleton";
import RankingSkeleton from "../../Components/Skeleton/RankingSkeleton";
//redux
import { __changeClap } from "../../Redux/modules/clap";
import { __GetLanks } from "../../Redux/modules/ranks";
import { useDispatch, useSelector } from "react-redux";

//styled import
import {
  FeedPage,
  MedalBox,
  RankingBox,
  RankTitle,
  UserProfile,
  UserName,
  UserArea,
  InfoArea,
  CategoryBox,
  CategoryArea,
  CategoryButton,
  CategoryButtonText,
  FeedArea,
  FeedCard,
  CardBottomArea,
  CardTopArea,
  TagArea,
  ClapPoint,
  ClapArea,
  FeedProfile,
  FeedNickname,
  FeedContent,
  FeedArrow,
  FeedText,
  TotalFeed,
  LargePhoto,
  ClapBox,
  ScrollDiv,
} from "./FeedStyled";
import { Button } from "../Admin/Admin/AdminStyled";

const Feed = () => {
  const ranks = useSelector((state) => state.res);

  console.log("123");

  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(0);
  const [loding, setLoding] = useState(false);
  const [FeedList, setFeedList] = useState([]);
  const [RankingList, setRankingList] = useState([]);
  const [last, setLast] = useState("");
  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const changeClap = (id) => {
    console.log("changeClap");
    dispatch(__changeClap(id));
  };

  useEffect(() => {
    dispatch(__GetLanks());
    console.log("123");
  }, [dispatch]);

  const categiriList = [
    "전체보기",
    "# NO일회용품",
    "# 분리수거",
    "# 환경운동",
    "# 환경용품사용",
    "#에너지절약",
    "#기타",
  ];
  const categoryApi = [
    "all",
    "disposable",
    "separate",
    "environmental",
    "goods",
    "energy",
    "etc",
  ];
  const URL = process.env.REACT_APP_URL;
  const ZeroPage = () => {
    setLoding(true);
    category == 0
      ? instance
          .get(`${URL}/feed/?lastFeedId=${Number.MAX_SAFE_INTEGER}`)
          .then((res) => {
            setFeedList(res.data.data);
            setLast(res.data.data[res.data.data.length - 1].id);
          })
      : instance
          .get(
            `${URL}/feed/tags/${categoryApi[category]}/?lastFeedId=${
              last === 0 ? Number.MAX_SAFE_INTEGER : last
            }`
          )
          .then((res) => {
            console.log(res);
            setFeedList([...FeedList, ...res.data.data]);
            setLast(res.data.data[res.data.data.length - 1].id);
          });
    setLoding(false);
  };
  const TagClick = () => {
    setLoding(true);
    category == 0
      ? instance
          .get(
            `${URL}/feed/?lastFeedId=${
              last == 0 ? Number.MAX_SAFE_INTEGER : last
            }`
          )
          .then((res) => {
            setFeedList([...FeedList, ...res.data.data]);
            setLast(res.data.data[res.data.data.length - 1].id);
          })
      : instance
          .get(
            `${URL}/feed/tags/${categoryApi[category]}/?lastFeedId=${
              last == 0 ? Number.MAX_SAFE_INTEGER : last
            }`
          )
          .then((res) => {
            setFeedList([...FeedList, ...res.data.data]);
            setLast(res.data.data[res.data.data.length - 1].id);
          });
    setLoding(false);
  };

  useEffect(() => {
    setPage(page + 1);
  }, [inView]);

  useEffect(() => {
    setFeedList([]);
    setPage(0);
    setLast(0);
  }, [category]);

  useEffect(() => {
    page === 0 || page % 2 ? TagClick() : console.log();
  }, [page]);
  const userList = [
    {
      userId: "우수진",
      profilePhoto:
        "https://cdn.pixabay.com/photo/2020/09/04/20/09/cartoon-5544856__340.jpg",
      nickname: "강이노",
    },
    {
      userId: "김은혜",
      profilePhoto:
        "https://cdn.allets.com/500/2018/11/06/500_364293_1541494746.jpeg",
      nickname: "강이노",
    },
    {
      userId: "강인호",
      profilePhoto:
        "https://cdn.pixabay.com/photo/2018/03/21/05/55/pig-3245668__340.png",
      nickname: "강이노",
    },
  ];

  return (
    <FeedPage>
      {/* {!loding ? (
        <RankingSkeleton />
      ) : ( */}
      <RankingBox>
        <RankTitle>데일리 랭킹</RankTitle>

        <MedalBox>
          {userList.map((item, index) => (
            <InfoArea>
              <Medal num={index} />
              <UserArea>
                <UserProfile src={item.profilePhoto} />
                <UserName>{item.userId}</UserName>
              </UserArea>
            </InfoArea>
          ))}
        </MedalBox>
      </RankingBox>
      {/* )} */}
      <CategoryArea>
        {categiriList.map((item, index) => (
          <CategoryButton
            key={item}
            onClick={() => setCategory(index)}
            check={index}
            num={category}
          >
            <CategoryButtonText>{item}</CategoryButtonText>
          </CategoryButton>
        ))}
      </CategoryArea>
      <FeedArea>
        {FeedList.map((item) => (
          <TotalFeed>
            <FeedCard>
              <CardTopArea>
                <TagArea>{item.tag}</TagArea>
                {/* 박수 */}
                <ClapArea
                  onClick={() => changeClap(item.id)}
                  color={item.clapByme ? "black" : "white"}
                  type="button"
                >
                  <ClapPoint>{item.clapCount}</ClapPoint>
                  <ClapBox>
                    <ClapIcon />
                  </ClapBox>
                </ClapArea>
              </CardTopArea>
              <LargePhoto src={item.missionImgUrl} />

              <CardBottomArea>
                <FeedProfile src={item.profilePhoto} />
                <FeedNickname>{item.authorName}</FeedNickname>
              </CardBottomArea>
            </FeedCard>
            <FeedContent>
              <FeedArrow />
              <FeedText>{item.content}</FeedText>
            </FeedContent>
          </TotalFeed>
        ))}
        {loding ? (
          <>
            <FeedSkeleton />
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        ) : null}
      </FeedArea>
      <ScrollDiv ref={ref} />
    </FeedPage>
  );
};

export default Feed;
