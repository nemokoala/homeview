import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
  MapTypeControl,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import ReviewBlock from "./ReviewBlock";
import { saveZoom, saveCenter, saveShowReview } from "slice/mapSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiAddress } from "value";
import { setModal } from "slice/modalSlice";

function MapCluster() {
  const loadZoomLevel = useSelector((state: any) => state.mapSet.zoomLevel);
  const loadCenter = useSelector((state: any) => state.mapSet.center);
  const loadShowReview = useSelector((state: any) => state.mapSet.showReview);
  const [reviewDatas, setReviewDatas] = useState<any>([]);
  const [roomDatas, setRoomDatas] = useState<any>([]);
  const [zoomLevel, setZoomLevel] = useState(loadZoomLevel);
  const [center, setCenter] = useState(loadCenter);
  const [showReview, setShowReview] = useState(loadShowReview);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [dongs, setDongs] = useState<any>([]);
  const [sidoTarget, setSidoTarget] = useState("");
  const [sido, setSido] = useState([
    { name: "서울", location: [37.5635694, 126.9800083] },
    { name: "제주", location: [33.485694444, 126.500333333] },
    { name: "전남", location: [34.8130444, 126.465] },
    { name: "전북", location: [35.81727, 127.11105277777777] },
    { name: "광주", location: [35.1569749999, 126.853363888] },
    { name: "경남", location: [35.234736111, 128.69416666666666] },
    { name: "경북", location: [36.399605555, 128.6027666] },
    { name: "울산", location: [35.5354083333, 129.313688] },
    { name: "대구", location: [35.86854166666, 128.60355277] },
    { name: "부산", location: [35.1770194444, 129.07695277] },
    { name: "충남", location: [36.3238722222, 126.922955555] },
    { name: "충북", location: [36.7325, 127.49358611111111] },
    { name: "세종", location: [36.4800121, 127.2890691] },
    { name: "대전", location: [36.347119444, 127.38656666] },
    { name: "인천", location: [37.4532333, 126.70735277] },
    { name: "강원", location: [37.742618, 128.270231] },
    { name: "경기", location: [37.2635694, 127.0800083] },
  ]);

  const [sigungu, setSigungu] = useState([
    { name: "서울/강남구", lat: 37.4951, lng: 127.06278 },
    { name: "서울/강동구", lat: 37.55274, lng: 127.14546 },
    { name: "서울/강북구", lat: 37.6349, lng: 127.02015 },
    { name: "서울/강서구", lat: 37.56227, lng: 126.81622 },
    { name: "서울/관악구", lat: 37.47876, lng: 126.95235 },
    { name: "서울/광진구", lat: 37.53913, lng: 127.08366 },
    { name: "서울/구로구", lat: 37.49447, lng: 126.8502 },
    { name: "서울/금천구", lat: 37.47486, lng: 126.89106 },
    { name: "서울/노원구", lat: 37.66045, lng: 127.06718 },
    { name: "서울/도봉구", lat: 37.65066, lng: 127.03011 },
    { name: "서울/동대문구", lat: 37.58189, lng: 127.05408 },
    { name: "서울/동작구", lat: 37.50056, lng: 126.95149 },
    { name: "서울/마포구", lat: 37.55438, lng: 126.90926 },
    { name: "서울/서대문구", lat: 37.57809, lng: 126.93506 },
    { name: "서울/서초구", lat: 37.49447, lng: 127.01088 },
    { name: "서울/성동구", lat: 37.54784, lng: 127.02461 },
    { name: "서울/성북구", lat: 37.60267, lng: 127.01448 },
    { name: "서울/송파구", lat: 37.5021, lng: 127.11113 },
    { name: "서울/양천구", lat: 37.52056, lng: 126.87472 },
    { name: "서울/영등포구", lat: 37.52606, lng: 126.90308 },
    { name: "서울/용산구", lat: 37.53391, lng: 126.9775 },
    { name: "서울/은평구", lat: 37.61846, lng: 126.9278 },
    { name: "서울/종로구", lat: 37.5729, lng: 126.97928 },
    { name: "서울/중구", lat: 37.55986, lng: 126.99398 },
    { name: "서울/중랑구", lat: 37.60199, lng: 127.10461 },
    { name: "부산/강서구", lat: 35.1593, lng: 128.933 },
    { name: "부산/금정구", lat: 35.25863, lng: 129.0901 },
    { name: "부산/기장군", lat: 35.29721, lng: 129.20076 },
    { name: "부산/남구", lat: 35.13648, lng: 129.08266 },
    { name: "부산/동구", lat: 35.12468, lng: 129.03432 },
    { name: "부산/동래구", lat: 35.20447, lng: 129.078 },
    { name: "부산/부산진구", lat: 35.16293, lng: 129.05133 },
    { name: "부산/북구", lat: 35.19724, lng: 128.99134 },
    { name: "부산/사상구", lat: 35.14479, lng: 128.97986 },
    { name: "부산/사하구", lat: 35.08552, lng: 128.98725 },
    { name: "부산/서구", lat: 35.12529, lng: 129.01946 },
    { name: "부산/수영구", lat: 35.15627, lng: 129.11253 },
    { name: "부산/연제구", lat: 35.18206, lng: 129.08285 },
    { name: "부산/영도구", lat: 35.07849, lng: 129.06483 },
    { name: "부산/중구", lat: 35.10594, lng: 129.03331 },
    { name: "부산/해운대구", lat: 35.16665, lng: 129.16792 },
    { name: "인천/강화군", lat: 37.74722, lng: 126.48556 },
    { name: "인천/계양구", lat: 37.52306, lng: 126.74472 },
    { name: "인천/남구", lat: 37.46362, lng: 126.65 },
    { name: "인천/남동구", lat: 37.41831, lng: 126.7184 },
    { name: "인천/동구", lat: 37.48375, lng: 126.6369 },
    { name: "인천/부평구", lat: 37.4972, lng: 126.71107 },
    { name: "인천/서구", lat: 37.55233, lng: 126.65543 },
    { name: "인천/연수구", lat: 37.41911, lng: 126.66489 },
    { name: "인천/옹진군", lat: 37.23361, lng: 126.12305 },
    { name: "인천/중구", lat: 37.47353, lng: 126.62151 },
    { name: "대구/중구", lat: 35.86678, lng: 128.59538 },
    { name: "대구/동구", lat: 35.88566, lng: 128.63296 },
    { name: "대구/서구", lat: 35.87465, lng: 128.55109 },
    { name: "대구/남구", lat: 35.84119, lng: 128.588 },
    { name: "대구/북구", lat: 35.9, lng: 128.59175 },
    { name: "대구/수성구", lat: 35.85905, lng: 128.62625 },
    { name: "대구/달서구", lat: 35.82569, lng: 128.52403 },
    { name: "대구/달성군", lat: 35.77467, lng: 128.42955 },
    { name: "광주/동구", lat: 35.14592, lng: 126.9232 },
    { name: "광주/서구", lat: 35.15248, lng: 126.89106 },
    { name: "광주/남구", lat: 35.12159, lng: 126.90943 },
    { name: "광주/북구", lat: 35.19232, lng: 126.92439 },
    { name: "광주/광산구", lat: 35.16158, lng: 126.8081 },
    { name: "대전/동구", lat: 36.32938, lng: 127.44313 },
    { name: "대전/중구", lat: 36.28044, lng: 127.41093 },
    { name: "대전/서구", lat: 36.28071, lng: 127.34533 },
    { name: "대전/유성구", lat: 36.36685, lng: 127.327 },
    { name: "대전/대덕구", lat: 36.39591, lng: 127.43437 },
    { name: "울산/중구", lat: 35.5684, lng: 129.33226 },
    { name: "울산/남구", lat: 35.54382, lng: 129.32917 },
    { name: "울산/동구", lat: 35.5047, lng: 129.4186 },
    { name: "울산/북구", lat: 35.58243, lng: 129.36049 },
    { name: "울산/울주군", lat: 35.56233, lng: 129.1269 },
    { name: "경기/가평군", lat: 37.8308, lng: 127.51522 },
    { name: "경기/고양시", lat: 37.65639, lng: 126.835 },
    { name: "경기/과천시", lat: 37.43407, lng: 126.99989 },
    { name: "경기/광명시", lat: 37.44435, lng: 126.86499 },
    { name: "경기/광주시", lat: 35.16667, lng: 126.91667 },
    { name: "경기/구리시", lat: 37.5986, lng: 127.1394 },
    { name: "경기/군포시", lat: 37.34261, lng: 126.92149 },
    { name: "경기/김포시", lat: 37.59417, lng: 126.7425 },
    { name: "경기/남양주시", lat: 37.65217, lng: 127.2401 },
    { name: "경기/동두천시", lat: 37.91889, lng: 127.06897 },
    { name: "경기/부천시", lat: 37.49889, lng: 126.78306 },
    { name: "경기/성남시", lat: 37.41875, lng: 127.12877 },
    { name: "경기/수원시", lat: 37.28586, lng: 127.00993 },
    { name: "경기/시흥시", lat: 37.39067, lng: 126.7888 },
    { name: "경기/안산시", lat: 37.31693, lng: 126.83048 },
    { name: "경기/안성시", lat: 37.03789, lng: 127.30057 },
    { name: "경기/안양시", lat: 37.3925, lng: 126.92694 },
    { name: "경기/양주시", lat: 37.81732, lng: 127.046 },
    { name: "경기/양평군", lat: 37.4888, lng: 127.49222 },
    { name: "경기/여주시", lat: 37.29562, lng: 127.63668 },
    { name: "경기/연천군", lat: 38.09404, lng: 127.07577 },
    { name: "경기/오산시", lat: 37.15222, lng: 127.07056 },
    { name: "경기/용인시", lat: 37.23825, lng: 127.17795 },
    { name: "경기/의왕시", lat: 37.345, lng: 126.97575 },
    { name: "경기/의정부시", lat: 37.73865, lng: 127.0477 },
    { name: "경기/이천시", lat: 37.27917, lng: 127.4425 },
    { name: "경기/파주시", lat: 37.75952, lng: 126.77772 },
    { name: "경기/평택시", lat: 36.99472, lng: 127.08889 },
    { name: "경기/포천시", lat: 37.8937, lng: 127.20028 },
    { name: "경기/하남시", lat: 37.53895, lng: 127.2125 },
    { name: "경기/화성시", lat: 37.20025, lng: 126.82909 },
    { name: "강원/원주시", lat: 37.32104, lng: 127.92132 },
    { name: "강원/춘천시", lat: 37.88048, lng: 127.72776 },
    { name: "강원/강릉시", lat: 37.7519, lng: 128.87825 },
    { name: "강원/동해시", lat: 37.52345, lng: 129.11357 },
    { name: "강원/속초시", lat: 38.20725, lng: 128.59275 },
    { name: "강원/삼척시", lat: 37.45013, lng: 129.16626 },
    { name: "강원/홍천군", lat: 37.6918, lng: 127.8857 },
    { name: "강원/태백시", lat: 37.1652, lng: 128.9857 },
    { name: "강원/철원군", lat: 38.24391, lng: 127.44522 },
    { name: "강원/횡성군", lat: 37.48817, lng: 127.9857 },
    { name: "강원/평창군", lat: 37.37028, lng: 128.39306 },
    { name: "강원/영월군", lat: 37.1833, lng: 128.4615 },
    { name: "강원/정선군", lat: 37.38911, lng: 128.72995 },
    { name: "강원/인제군", lat: 38.04416, lng: 128.27876 },
    { name: "강원/고성군", lat: 38.37945, lng: 128.46755 },
    { name: "강원/양양군", lat: 38.06215, lng: 128.61471 },
    { name: "강원/화천군", lat: 38.14212, lng: 127.67615 },
    { name: "강원/양구군", lat: 38.10583, lng: 127.98944 },
    { name: "세종/세종시", lat: 36.4800121, lng: 127.2890691 },
    { name: "충북/청주시", lat: 36.63722, lng: 127.48972 },
    { name: "충북/충주시", lat: 37.01791, lng: 127.87713 },
    { name: "충북/제천시", lat: 37.06206, lng: 128.14065 },
    { name: "충북/보은군", lat: 36.49489, lng: 127.72865 },
    { name: "충북/옥천군", lat: 36.3012, lng: 127.568 },
    { name: "충북/영동군", lat: 36.1645, lng: 127.79018 },
    { name: "충북/증평군", lat: 36.78377, lng: 127.59858 },
    { name: "충북/진천군", lat: 36.85667, lng: 127.44333 },
    { name: "충북/괴산군", lat: 36.77179, lng: 127.81426 },
    { name: "충북/음성군", lat: 36.92602, lng: 127.6807 },
    { name: "충북/단양군", lat: 36.98615, lng: 128.36945 },
    { name: "충남/천안시", lat: 36.80488, lng: 127.19431 },
    { name: "충남/공주시", lat: 36.45556, lng: 127.12472 },
    { name: "충남/보령시", lat: 36.35649, lng: 126.59444 },
    { name: "충남/아산시", lat: 36.78361, lng: 127.00417 },
    { name: "충남/서산시", lat: 36.78518, lng: 126.46568 },
    { name: "충남/논산시", lat: 36.19774, lng: 127.12143 },
    { name: "충남/계룡시", lat: 36.29304, lng: 127.22575 },
    { name: "충남/당진시", lat: 36.91667, lng: 126.66667 },
    { name: "충남/금산군", lat: 36.13381, lng: 127.48062 },
    { name: "충남/부여군", lat: 36.26257, lng: 126.85802 },
    { name: "충남/서천군", lat: 36.1082, lng: 126.69722 },
    { name: "충남/청양군", lat: 36.44586, lng: 126.84288 },
    { name: "충남/홍성군", lat: 36.56705, lng: 126.62626 },
    { name: "충남/예산군", lat: 36.68218, lng: 126.79592 },
    { name: "충남/태안군", lat: 36.70036, lng: 126.28391 },
    { name: "경북/포항시", lat: 36.08333, lng: 129.36667 },
    { name: "경북/경주시", lat: 35.84278, lng: 129.21167 },
    { name: "경북/김천시", lat: 36.14481, lng: 128.11157 },
    { name: "경북/안동시", lat: 36.56636, lng: 128.72275 },
    { name: "경북/구미시", lat: 36.21009, lng: 128.35442 },
    { name: "경북/영주시", lat: 36.87459, lng: 128.58631 },
    { name: "경북/영천시", lat: 36, lng: 129 },
    { name: "경북/상주시", lat: 36.41667, lng: 128.16667 },
    { name: "경북/문경시", lat: 36.59458, lng: 128.19946 },
    { name: "경북/경산시", lat: 35.83333, lng: 128.8 },
    { name: "경북/군위군", lat: 36.16995, lng: 128.64705 },
    { name: "경북/의성군", lat: 36.36122, lng: 128.61517 },
    { name: "경북/청송군", lat: 36.43288, lng: 129.05159 },
    { name: "경북/영양군", lat: 36.69592, lng: 129.14196 },
    { name: "경북/영덕군", lat: 36.48125, lng: 129.31078 },
    { name: "경북/청도군", lat: 35.67166, lng: 128.78509 },
    { name: "경북/고령군", lat: 35.74959, lng: 128.29707 },
    { name: "경북/성주군", lat: 35.91888, lng: 128.28838 },
    { name: "경북/칠곡군", lat: 36.01512, lng: 128.46138 },
    { name: "경북/예천군", lat: 36.65272, lng: 128.43007 },
    { name: "경북/봉화군", lat: 36.88951, lng: 128.73573 },
    { name: "경북/울진군", lat: 36.91968, lng: 129.31966 },
    { name: "경북/울릉군", lat: 37.50442, lng: 130.86084 },
    { name: "경남/창원시", lat: 35.27533, lng: 128.65152 },
    { name: "경남/김해시", lat: 35.25, lng: 128.86667 },
    { name: "경남/진주시", lat: 35.20445, lng: 128.12408 },
    { name: "경남/양산시", lat: 35.39866, lng: 129.03612 },
    { name: "경남/거제시", lat: 34.9, lng: 128.66666 },
    { name: "경남/통영시", lat: 34.8736, lng: 128.39709 },
    { name: "경남/사천시", lat: 35.00385, lng: 128.06857 },
    { name: "경남/밀양시", lat: 35.49333, lng: 128.74889 },
    { name: "경남/함안군", lat: 35.29117, lng: 128.4297 },
    { name: "경남/거창군", lat: 35.68735, lng: 127.91142 },
    { name: "경남/창녕군", lat: 35.50822, lng: 128.4902 },
    { name: "경남/고성군", lat: 35.01478, lng: 128.28244 },
    { name: "경남/하동군", lat: 35.13628, lng: 127.77291 },
    { name: "경남/합천군", lat: 35.5741, lng: 128.13841 },
    { name: "경남/남해군", lat: 34.80433, lng: 127.92708 },
    { name: "경남/함양군", lat: 35.55233, lng: 127.71196 },
    { name: "경남/산청군", lat: 35.36625, lng: 127.87065 },
    { name: "경남/의령군", lat: 35.3923, lng: 128.26917 },
    { name: "전북/전주시", lat: 35.82194, lng: 127.14889 },
    { name: "전북/익산시", lat: 35.94389, lng: 126.95444 },
    { name: "전북/군산시", lat: 35.93583, lng: 126.68338 },
    { name: "전북/정읍시", lat: 35.6, lng: 126.91667 },
    { name: "전북/완주군", lat: 35.84509, lng: 127.14752 },
    { name: "전북/김제시", lat: 35.80701, lng: 126.90755 },
    { name: "전북/남원시", lat: 35.42966, lng: 127.43208 },
    { name: "전북/고창군", lat: 35.43483, lng: 126.70047 },
    { name: "전북/부안군", lat: 35.7, lng: 126.66667 },
    { name: "전북/임실군", lat: 35.6066, lng: 127.2301 },
    { name: "전북/순창군", lat: 35.41667, lng: 127.16667 },
    { name: "전북/진안군", lat: 35.8216, lng: 127.41183 },
    { name: "전북/장수군", lat: 35.66667, lng: 127.53333 },
    { name: "전북/무주군", lat: 35.93172, lng: 127.71118 },
    { name: "전남/여수시", lat: 34.77647, lng: 127.64253 },
    { name: "전남/순천시", lat: 34.98951, lng: 127.39551 },
    { name: "전남/목포시", lat: 34.80826, lng: 126.3942 },
    { name: "전남/광양시", lat: 35.02926, lng: 127.64882 },
    { name: "전남/나주시", lat: 35.05683, lng: 126.67362 },
    { name: "전남/무안군", lat: 34.95642, lng: 126.44041 },
    { name: "전남/해남군", lat: 34.54047, lng: 126.5187 },
    { name: "전남/고흥군", lat: 34.58333, lng: 127.33333 },
    { name: "전남/화순군", lat: 35.00843, lng: 127.02576 },
    { name: "전남/영암군", lat: 34.7979, lng: 126.62651 },
    { name: "전남/영광군", lat: 35.28711, lng: 126.43616 },
    { name: "전남/완도군", lat: 34.31182, lng: 126.73845 },
    { name: "전남/담양군", lat: 35.33976, lng: 126.99125 },
    { name: "전남/장성군", lat: 35.32734, lng: 126.76817 },
    { name: "전남/보성군", lat: 34.81426, lng: 127.15765 },
    { name: "전남/신안군", lat: 34.8262, lng: 126.10863 },
    { name: "전남/장흥군", lat: 34.66667, lng: 126.91667 },
    { name: "전남/강진군", lat: 34.61787, lng: 126.76758 },
    { name: "전남/함평군", lat: 35.11641, lng: 126.53221 },
    { name: "전남/진도군", lat: 34.41018, lng: 126.1688 },
    { name: "전남/곡성군", lat: 35.21449, lng: 127.2628 },
    { name: "전남/구례군", lat: 35.20944, lng: 127.46444 },
    { name: "제주/제주시", lat: 33.50972, lng: 126.52194 },
    { name: "제주/서귀포시", lat: 33.29307, lng: 126.49748 },
  ]);
  const [windowHeight, setWindowHeight] = useState<any>(window.innerHeight);
  let timerEnable = true;
  useEffect(() => {
    if (zoomLevel <= 5) {
      setZoomLevel(10);
      setTimeout(() => {
        setZoomLevel(loadZoomLevel);
      }, 15);
    }
    document.documentElement.style.setProperty("--minHeight", `auto`);
    function handleResize() {
      //ios safari 하단바 문제 해결
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.documentElement.style.setProperty("--minHeight", `100vh`);
    };
  }, []); //오버레이 버그 수정을 위한 지도 줌 새로고침

  useEffect(() => {
    if (sidoTarget) getRoomDatas();
  }, [sidoTarget]);

  useEffect(() => {
    setDongPosition();
  }, [roomDatas]);

  const getRoomDatas = async () => {
    try {
      const response = await axios.get(`${apiAddress}/room/sido/${sidoTarget}`);
      setRoomDatas((prevRoomDatas: any): any => [
        ...prevRoomDatas,
        ...response.data,
      ]);
      console.log(JSON.stringify(response));
    } catch (error: any) {
      const errorText = JSON.stringify(error);
      dispatch(
        setModal({
          title: "에러!",
          titleColor: "red",
          text: errorText,
        } as any)
      );
    }
  };

  const getReviewDatas = async (room_id: any) => {
    try {
      const response = await axios.get(
        `${apiAddress}/review/search/${room_id}`
      );
      setReviewDatas(response.data);
      console.log(JSON.stringify(response));
    } catch (error: any) {
      const errorText = JSON.stringify(error);
      dispatch(
        setModal({
          title: "에러!",
          titleColor: "red",
          text: errorText,
        } as any)
      );
    }
  };
  const returnSigungu = (name: string): string => {
    const [sido, sigungu] = name.split("/");
    return sigungu;
  };

  const setDongPosition = () => {
    const room = roomDatas;
    const groupByDong = room.reduce((result: any, item: any) => {
      const { dong, lat, lng } = item;
      if (!result[dong]) {
        result[dong] = { lat: lat, lng: lng, count: 1 };
      } else {
        result[dong].lat += lat;
        result[dong].lng += lng;
        result[dong].count += 1;
      }
      return result;
    }, {});

    const avgLatLongByDong = Object.entries(groupByDong).map(
      ([dong, value]: any) => {
        const avgLat = value.lat / value.count;
        const avgLng = value.lng / value.count;
        return { dong, lat: avgLat, lng: avgLng, count: value.count };
      }
    );

    //console.log(avgLatLongByDong);
    setDongs(avgLatLongByDong);
  };

  const setShow = (reviews: any) => {
    //오버레이 클릭 시 지도 밑에 건물 목록 표시
    // const showReview = reviewData.filter(
    //   (review: any) => review.building === reviews.building
    // );
    // dispatch(saveShowReview(showReview as any));
    // setShowReview(showReview);
  };

  async function getAddressInfo(latitude: any, longitude: any) {
    const appKey = process.env.REACT_APP_REST;
    const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `KakaoAK ${appKey}`,
        },
      });

      if (
        response.data &&
        response.data.documents &&
        response.data.documents.length > 0
      ) {
        const addressInfo = response.data.documents[0];
        let region_1depth_name = addressInfo.address.region_1depth_name;
        if (region_1depth_name === "세종특별자치시")
          region_1depth_name = "세종";
        if (region_1depth_name === "제주특별자치도")
          region_1depth_name = "제주";
        if (region_1depth_name === "강원특별자치도")
          region_1depth_name = "강원";
        setSidoTarget(region_1depth_name);
        console.log("시도 정보:", region_1depth_name);
      } else {
        console.log("주소 정보를 찾을 수 없습니다");
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  }

  return (
    <Container wHeight={windowHeight}>
      <Map // 지도를 표시할 Container
        center={center}
        isPanto={false}
        style={{
          // 지도의 크기
          width: "100%",
          height: "50%",
        }}
        level={zoomLevel} // 지도의 확대 레벨
        onZoomChanged={(map) => {
          setZoomLevel(map.getLevel());
        }}
        onTileLoaded={(map) => {
          console.log("ontileloaded");
          getAddressInfo(map.getCenter().getLat(), map.getCenter().getLng());
          dispatch(saveZoom(map.getLevel() as any));
          dispatch(
            saveCenter({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            } as any)
          );
        }}
        onCenterChanged={(map) => {
          if (timerEnable) {
            getAddressInfo(map.getCenter().getLat(), map.getCenter().getLng());
            timerEnable = false;
            setTimeout(() => {
              timerEnable = true;
            }, 500);
          }
        }}
        // onDragEnd={(map) => {
        //   console.log("ondragEnd");
        //   setTimeout(() => {
        //     dispatch(saveZoom(map.getLevel() as any));
        //     dispatch(
        //       saveCenter({
        //         lat: map.getCenter().getLat(),
        //         lng: map.getCenter().getLng(),
        //       } as any)
        //     );
        //   }, 100);
        // }}
      >
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={6} // 클러스터 할 최소 지도 레벨
        >
          {zoomLevel < 7 &&
            roomDatas.map((roomData: any, idx: any): any => (
              <React.Fragment
                key={`customoverlay_${roomData.room_id}-${roomData.latitude}-${roomData.longitude}`}
              >
                <CustomOverlayMap //커스텀 오버레이 건물 표시
                  position={{
                    lat: roomData.latitude,
                    lng: roomData.longitude,
                  }}
                  yAnchor={zoomLevel >= 6 ? 1.0 : 2.2}
                >
                  <CustomDiv
                    style={{ background: "rgb(255,255, 255,0.5)" }}
                    onClick={() => {
                      getReviewDatas(roomData.room_id);
                      setCenter({
                        lat:
                          roomData.latitude +
                          Math.random() * (0.000009 - 0.000001) +
                          0.0001,
                        lng:
                          roomData.longitude +
                          Math.random() * (0.000009 - 0.000001) +
                          0.0001, //같은 거 클릭했을 때 먹통 안되게 랜덤값 추가
                      });
                    }}
                  >
                    {roomData.building}{" "}
                    <div style={{ color: "red" }}>{roomData.length}</div>
                  </CustomDiv>
                </CustomOverlayMap>
              </React.Fragment>
            ))}
        </MarkerClusterer>

        {reviewDatas.map((reviewData: any, idx: any): any => (
          <React.Fragment
            key={`marker_${reviewData.reviewId}-${reviewData.lat}-${reviewData.lng}`}
          >
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

        {zoomLevel >= 10 && //시도 표시
          sido.map((root: any) => (
            <CustomOverlayMap
              key={root.name}
              position={{
                lat: root.location[0],
                lng: root.location[1],
              }}
            >
              <CustomDiv
                onClick={() => {
                  setCenter({
                    lat:
                      root.location[0] +
                      Math.random() * (0.000009 - 0.000001) +
                      0.0001,
                    lng:
                      root.location[1] +
                      Math.random() * (0.000009 - 0.000001) +
                      0.0001,
                  });
                  setZoomLevel(9);
                }}
                style={
                  root.count > 0
                    ? {
                        backgroundColor: "rgb(243, 206, 83, 0.7)",
                      }
                    : {}
                }
              >
                <div>{root.name}</div>{" "}
                <div style={{ color: "red" }}>{root.count}</div>
              </CustomDiv>
            </CustomOverlayMap>
          ))}

        {7 < zoomLevel &&
          zoomLevel < 10 && //시 구 표시
          sigungu.map((sigungu: any) => (
            <CustomOverlayMap
              key={sigungu.name}
              position={{
                lat: sigungu.lat,
                lng: sigungu.lng,
              }}
            >
              <CustomDiv
                onClick={() => {
                  setCenter({
                    lat:
                      sigungu.lat +
                      Math.random() * (0.000009 - 0.000001) +
                      0.0001,
                    lng:
                      sigungu.lng +
                      Math.random() * (0.000009 - 0.000001) +
                      0.0001,
                  });
                  setZoomLevel(7);
                }}
                style={
                  sigungu.count > 0
                    ? { backgroundColor: "rgb(243, 206, 83, 0.7)" }
                    : {}
                }
              >
                <div>{returnSigungu(sigungu.name)}</div>{" "}
                <div style={{ color: "red" }}>{sigungu.count}</div>
              </CustomDiv>
            </CustomOverlayMap>
          ))}

        {7 === zoomLevel &&
          //동 표시
          dongs.map((dong: any) => (
            <CustomOverlayMap
              key={dong.dong}
              position={{
                lat: dong.lat,
                lng: dong.lng,
              }}
            >
              <CustomDiv
                onClick={() => {
                  setCenter({
                    lat:
                      dong.lat + Math.random() * (0.000009 - 0.000001) + 0.0001,
                    lng:
                      dong.lng + Math.random() * (0.000009 - 0.000001) + 0.0001,
                  });
                  setZoomLevel(6);
                }}
                style={
                  dong.count > 0
                    ? { backgroundColor: "rgb(243, 206, 83, 0.7)" }
                    : {}
                }
              >
                <div>{dong.dong}</div>{" "}
                <div style={{ color: "red" }}>{dong.count}</div>
              </CustomDiv>
            </CustomOverlayMap>
          ))}
        <ZoomControl />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
      <ContentDiv>
        {reviewDatas.length > 0 &&
          reviewDatas.map((review: any) => (
            <ReviewBlock key={review.reviewId} review={review} />
          ))}
        {showReview.length === 0 && (
          <Notice>마커를 클릭하여 리뷰정보를 확인하세요!</Notice>
        )}
      </ContentDiv>
    </Container>
  );
}
const Container = styled.div<any>`
  width: 100%;
  height: calc(${(props) => props.wHeight}px - var(--navHeight));
`;

const CustomDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  color: black;
  justify-content: center;
  align-items: baseline;
  padding: 7px;
  font-size: 0.9rem;
  border-radius: 30px;
  background: transparent;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(255, 241, 195, 0.4);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 10px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  transition: all 0.5s;
  &:hover {
    background-color: rgba(199, 208, 247, 0.8) !important;
  }
`;
const Notice = styled.div`
  margin: 15px;
  font-size: 1.2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 20px;
  border-radius: 20px;
  transition: all 0.7s;
  text-align: center;
  background-color: rgb(227, 241, 253);
  &:hover {
    background-color: rgb(255, 241, 195);
    cursor: pointer;
    transform: scale(1.03);
  }
`;
const ContentDiv = styled.div`
  width: 100%;
  height: 50%;
  overflow-y: scroll;
  background: linear-gradient(
    to bottom,
    rgb(249, 254, 255),
    rgb(255, 250, 250),
    rgb(223, 236, 252)
  );
`;

export default MapCluster;
