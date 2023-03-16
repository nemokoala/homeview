import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";

function MapContainer({ data }: any) {
  const [state, setState] = useState<any>({
    center: { lat: 33.452613, lng: 126.570888 },
    isPanto: false,
  });
  let geocoder = new kakao.maps.services.Geocoder();

  function searchLoc() {
    geocoder.addressSearch(
      data.newAddress,
      function (result: any, status: any): any {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setState({ center: { lat: result[0].y, lng: result[0].x } });
        }
      }
    );
  }
  useEffect(() => {
    searchLoc();
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
        <MapMarker // 마커를 생성합니다
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
  background-color: white;
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
    padding-top: 10px;
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
