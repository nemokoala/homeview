import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

function MapCluster({ reviewData }: any) {
  const [reviewDatas, setReviewDatas] = useState<any>([]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const navigate = useNavigate();

  useEffect(() => {
    setReviewDatas(reviewData);
  }, []);

  return (
    <>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 36.2683,
          lng: 127.6358,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={13} // 지도의 확대 레벨
        onZoomChanged={(map) => setZoomLevel(map.getLevel())}
      >
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={6} // 클러스터 할 최소 지도 레벨
        >
          {reviewDatas.map((reviewData: any, idx: any): any => (
            <React.Fragment
              key={`customoverlay_${reviewData.lat}-${reviewData.lng}`}
            >
              <CustomOverlayMap
                position={{
                  lat: reviewData.lat,
                  lng: reviewData.lng,
                }}
                yAnchor={2.1}
              >
                <CustomDiv
                  onClick={() => navigate(`/review/${reviewData.reviewId}`)}
                >
                  {reviewData.building}
                </CustomDiv>
              </CustomOverlayMap>
            </React.Fragment>
          ))}
        </MarkerClusterer>

        {reviewDatas.map((reviewData: any, idx: any): any => (
          <React.Fragment key={`marker_${reviewData.lat}-${reviewData.lng}`}>
            {zoomLevel < 6 && (
              <MapMarker // 해당 건물 마커
                position={{
                  lat: reviewData.lat,
                  lng: reviewData.lng,
                }}
              ></MapMarker>
            )}
          </React.Fragment>
        ))}
      </Map>
    </>
  );
}

const CustomDiv = styled.div`
  color: black;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  background: transparent;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgb(255, 255, 255, 0.5);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 10px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  &:hover {
    background-color: rgb(199, 208, 247, 0.6);
  }
`;
export default MapCluster;
