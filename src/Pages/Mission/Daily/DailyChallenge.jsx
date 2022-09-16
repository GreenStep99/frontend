//react import
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//redux import
import { __GetTodaymission } from "../../../Redux/modules/mission";
//styled import
import {
  ChallengeBox,
  ChallengeTextArea,
  ChallengeBody,
  ChallengePhoto,
  MissionText,
  ChallengeTitle,
  ChallengeTimer,
  ChallengeWaiting,
  FeedButton,
  ChallengeMissionText,
} from "./DailyMissionStyled";
//component import
import ChallengeSkeleton from "../../../Components/Skeleton/ChallengeSkeleton";

const DailyChallenge = ({ mission }) => {
  const [hour, setHour] = useState(23 - new Date().getHours());
  const [minute, setMinute] = useState(59 - new Date().getMinutes());
  const [second, setSecond] = useState(59 - new Date().getSeconds());

  useEffect(() => {
    const id = setInterval(() => {
      setHour(23 - new Date().getHours());
      setMinute(59 - new Date().getMinutes());
      setSecond(59 - new Date().getSeconds());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const navigate = useNavigate();
  // 값을 받기 전에 렌더링 되면서 없는 값을 실행하려고 하니까 에러가 남. 그래서 값을 받아올 때 까지 띄어주는 코드가 필요함.(삼항연산자)
  return (
    <>
      {mission ? (
        <ChallengeBox>
          <ChallengeTextArea>
            <ChallengeTitle>Challenge Mission</ChallengeTitle>
            <ChallengeTimer>
              미션 완료까지 &nbsp;
              {hour < 10 ? "0" + hour : hour}:
              {minute < 10 ? "0" + minute : minute}:
              {second < 10 ? "0" + second : second}
            </ChallengeTimer>
          </ChallengeTextArea>
          <ChallengeBody
            onClick={() => navigate(`/explain/${mission.missionId}&challenge`)}
          >
            {!mission.status === "DEFAULT" ? (
              <ChallengeWaiting>
                <MissionText>인증 대기중</MissionText>
              </ChallengeWaiting>
            ) : null}
            {mission.status === "DONE" ? (
              <FeedButton>피드 올리기</FeedButton>
            ) : null}

            <ChallengePhoto src={mission.missionImageUrl} />
            <ChallengeMissionText>{mission.missionName}</ChallengeMissionText>
          </ChallengeBody>
        </ChallengeBox>
      ) : (
        <ChallengeSkeleton />
      )}
    </>
  );
};

export default DailyChallenge;
