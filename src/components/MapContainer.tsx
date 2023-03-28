import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";

function MapContainer({ data }: any) {
  const [state, setState] = useState<any>({
    center: { lat: 33.452613, lng: 126.570888 },
    isPanto: false,
  });
  const [myLocation, setMyLocation] = useState({
    location: {
      lat: 35,
      lng: 127,
    },

    isLoading: true,
  });
  let geocoder = new kakao.maps.services.Geocoder();

  function searchLoc() {
    geocoder.addressSearch(
      data.newAddress,
      function (result: any, status: any): any {
        // 정상적으로 검색이 완료됐으면
        if (status == kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setState({ center: { lat: result[0].y, lng: result[0].x } });
        }
      }
    );
  }
  useEffect(() => {
    searchLoc();

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation((prev) => ({
          location: {
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          },
          isLoading: false,
        }));
      });
    }
  }, []);
  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "400px",
        }}
        level={4} // 지도의 확대 레벨
      >
        <MapMarker // 해당 건물 마커
          position={state.center}
        ></MapMarker>
        <CustomOverlayMap position={state.center} xAnchor={0.5} yAnchor={1.5}>
          <Div>
            <div className="building">{data.building}</div>
            <div className="buttons">
              <a
                href={`https://map.kakao.com/link/to/${data.building},${state.center.lat},${state.center.lng}`}
                target="_blank"
              >
                <div className="road">길찾기</div>
              </a>
              <a
                href={`https://map.kakao.com/link/map/${data.building},${state.center.lat},${state.center.lng}`}
                target="_blank"
              >
                <div className="showmap">지도보기</div>
              </a>
            </div>
          </Div>
        </CustomOverlayMap>

        <MapMarker // 내 위치 마커
          position={myLocation.location}
        ></MapMarker>
        <CustomOverlayMap
          position={myLocation.location}
          xAnchor={0.5}
          yAnchor={2.3}
        >
          <Div>
            <div
              className="building"
              style={{ padding: "7px 10px", fontSize: "1rem", height: "auto" }}
            >
              현재 위치
            </div>
          </Div>
        </CustomOverlayMap>
        <ZoomControl />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
    </>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  background: transparent;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgb(255, 255, 255, 0.58);
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 10px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  & .buttons {
    display: flex;
  }
  & .building {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 50px;
    padding: 10px 10px 0 10px;
    font-weight: bolder;
    font-size: 1.3rem;
  }
  & .road,
  .showmap {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 71, 71);
    color: white;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    margin: 10px;
    transition: all 0.5s;
  }
  & .road:hover,
  .showmap:hover {
    background-color: rgb(255, 139, 139);
  }

  & .showmap {
    margin-left: 0px;
  }
  & a {
    text-decoration: none;
  }
`;

export default MapContainer;