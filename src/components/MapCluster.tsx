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
  const [center, setCenter] = useState({
    lat: 36.2683,
    lng: 127.6358,
  });
  const navigate = useNavigate();

  const [sido, setSido] = useState([
    { name: "서울", location: [37.5635694, 126.9800083], count: 0 },
    { name: "제주", location: [33.485694444, 126.500333333], count: 0 },
    { name: "전남", location: [34.8130444, 126.465], count: 0 },
    { name: "전북", location: [35.81727, 127.11105277777777], count: 0 },
    { name: "광주", location: [35.1569749999, 126.853363888], count: 0 },
    { name: "경남", location: [35.234736111, 128.69416666666666], count: 0 },
    { name: "경북", location: [36.399605555, 128.6027666], count: 0 },
    { name: "울산", location: [35.5354083333, 129.313688], count: 0 },
    { name: "대구", location: [35.86854166666, 128.60355277], count: 0 },
    { name: "부산", location: [35.1770194444, 129.07695277], count: 0 },
    { name: "충남", location: [36.3238722222, 126.922955555], count: 0 },
    { name: "충북", location: [36.7325, 127.49358611111111], count: 0 },
    { name: "세종", location: [36.4800121, 127.2890691], count: 0 },
    { name: "대전", location: [36.347119444, 127.38656666], count: 0 },
    { name: "인천", location: [37.4532333, 126.70735277], count: 0 },
    { name: "강원", location: [37.742618, 128.270231], count: 0 },
    { name: "경기", location: [37.2635694, 127.0800083], count: 0 },
  ]);

  const [sigungu, setSigungu] = useState([
    { name: "서울/강남구", lat: 37.4951, lng: 127.06278, count: 0 },
    { name: "서울/강동구", lat: 37.55274, lng: 127.14546, count: 0 },
    { name: "서울/강북구", lat: 37.6349, lng: 127.02015, count: 0 },
    { name: "서울/강서구", lat: 37.56227, lng: 126.81622, count: 0 },
    { name: "서울/관악구", lat: 37.47876, lng: 126.95235, count: 0 },
    { name: "서울/광진구", lat: 37.53913, lng: 127.08366, count: 0 },
    { name: "서울/구로구", lat: 37.49447, lng: 126.8502, count: 0 },
    { name: "서울/금천구", lat: 37.47486, lng: 126.89106, count: 0 },
    { name: "서울/노원구", lat: 37.66045, lng: 127.06718, count: 0 },
    { name: "서울/도봉구", lat: 37.65066, lng: 127.03011, count: 0 },
    { name: "서울/동대문구", lat: 37.58189, lng: 127.05408, count: 0 },
    { name: "서울/동작구", lat: 37.50056, lng: 126.95149, count: 0 },
    { name: "서울/마포구", lat: 37.55438, lng: 126.90926, count: 0 },
    { name: "서울/서대문구", lat: 37.57809, lng: 126.93506, count: 0 },
    { name: "서울/서초구", lat: 37.49447, lng: 127.01088, count: 0 },
    { name: "서울/성동구", lat: 37.54784, lng: 127.02461, count: 0 },
    { name: "서울/성북구", lat: 37.60267, lng: 127.01448, count: 0 },
    { name: "서울/송파구", lat: 37.5021, lng: 127.11113, count: 0 },
    { name: "서울/양천구", lat: 37.52056, lng: 126.87472, count: 0 },
    { name: "서울/영등포구", lat: 37.52606, lng: 126.90308, count: 0 },
    { name: "서울/용산구", lat: 37.53391, lng: 126.9775, count: 0 },
    { name: "서울/은평구", lat: 37.61846, lng: 126.9278, count: 0 },
    { name: "서울/종로구", lat: 37.5729, lng: 126.97928, count: 0 },
    { name: "서울/중구", lat: 37.55986, lng: 126.99398, count: 0 },
    { name: "서울/중랑구", lat: 37.60199, lng: 127.10461, count: 0 },
    { name: "부산/강서구", lat: 35.1593, lng: 128.933, count: 0 },
    { name: "부산/금정구", lat: 35.25863, lng: 129.0901, count: 0 },
    { name: "부산/기장군", lat: 35.29721, lng: 129.20076, count: 0 },
    { name: "부산/남구", lat: 35.13648, lng: 129.08266, count: 0 },
    { name: "부산/동구", lat: 35.12468, lng: 129.03432, count: 0 },
    { name: "부산/동래구", lat: 35.20447, lng: 129.078, count: 0 },
    { name: "부산/부산진구", lat: 35.16293, lng: 129.05133, count: 0 },
    { name: "부산/북구", lat: 35.19724, lng: 128.99134, count: 0 },
    { name: "부산/사상구", lat: 35.14479, lng: 128.97986, count: 0 },
    { name: "부산/사하구", lat: 35.08552, lng: 128.98725, count: 0 },
    { name: "부산/서구", lat: 35.12529, lng: 129.01946, count: 0 },
    { name: "부산/수영구", lat: 35.15627, lng: 129.11253, count: 0 },
    { name: "부산/연제구", lat: 35.18206, lng: 129.08285, count: 0 },
    { name: "부산/영도구", lat: 35.07849, lng: 129.06483, count: 0 },
    { name: "부산/중구", lat: 35.10594, lng: 129.03331, count: 0 },
    { name: "부산/해운대구", lat: 35.16665, lng: 129.16792, count: 0 },
    { name: "인천/강화군", lat: 37.74722, lng: 126.48556, count: 0 },
    { name: "인천/계양구", lat: 37.52306, lng: 126.74472, count: 0 },
    { name: "인천/남구", lat: 37.46362, lng: 126.65, count: 0 },
    { name: "인천/남동구", lat: 37.41831, lng: 126.7184, count: 0 },
    { name: "인천/동구", lat: 37.48375, lng: 126.6369, count: 0 },
    { name: "인천/부평구", lat: 37.4972, lng: 126.71107, count: 0 },
    { name: "인천/서구", lat: 37.55233, lng: 126.65543, count: 0 },
    { name: "인천/연수구", lat: 37.41911, lng: 126.66489, count: 0 },
    { name: "인천/옹진군", lat: 37.23361, lng: 126.12305, count: 0 },
    { name: "인천/중구", lat: 37.47353, lng: 126.62151, count: 0 },
    { name: "대구/중구", lat: 35.86678, lng: 128.59538, count: 0 },
    { name: "대구/동구", lat: 35.88566, lng: 128.63296, count: 0 },
    { name: "대구/서구", lat: 35.87465, lng: 128.55109, count: 0 },
    { name: "대구/남구", lat: 35.84119, lng: 128.588, count: 0 },
    { name: "대구/북구", lat: 35.9, lng: 128.59175, count: 0 },
    { name: "대구/수성구", lat: 35.85905, lng: 128.62625, count: 0 },
    { name: "대구/달서구", lat: 35.82569, lng: 128.52403, count: 0 },
    { name: "대구/달성군", lat: 35.77467, lng: 128.42955, count: 0 },
    { name: "광주/동구", lat: 35.14592, lng: 126.9232, count: 0 },
    { name: "광주/서구", lat: 35.15248, lng: 126.89106, count: 0 },
    { name: "광주/남구", lat: 35.12159, lng: 126.90943, count: 0 },
    { name: "광주/북구", lat: 35.19232, lng: 126.92439, count: 0 },
    { name: "광주/광산구", lat: 35.16158, lng: 126.8081, count: 0 },
    { name: "대전/동구", lat: 36.32938, lng: 127.44313, count: 0 },
    { name: "대전/중구", lat: 36.28044, lng: 127.41093, count: 0 },
    { name: "대전/서구", lat: 36.28071, lng: 127.34533, count: 0 },
    { name: "대전/유성구", lat: 36.36685, lng: 127.327, count: 0 },
    { name: "대전/대덕구", lat: 36.39591, lng: 127.43437, count: 0 },
    { name: "울산/중구", lat: 35.5684, lng: 129.33226, count: 0 },
    { name: "울산/남구", lat: 35.54382, lng: 129.32917, count: 0 },
    { name: "울산/동구", lat: 35.5047, lng: 129.4186, count: 0 },
    { name: "울산/북구", lat: 35.58243, lng: 129.36049, count: 0 },
    { name: "울산/울주군", lat: 35.56233, lng: 129.1269, count: 0 },
    { name: "경기/가평군", lat: 37.8308, lng: 127.51522, count: 0 },
    { name: "경기/고양시", lat: 37.65639, lng: 126.835, count: 0 },
    { name: "경기/과천시", lat: 37.43407, lng: 126.99989, count: 0 },
    { name: "경기/광명시", lat: 37.44435, lng: 126.86499, count: 0 },
    { name: "경기/광주시", lat: 35.16667, lng: 126.91667, count: 0 },
    { name: "경기/구리시", lat: 37.5986, lng: 127.1394, count: 0 },
    { name: "경기/군포시", lat: 37.34261, lng: 126.92149, count: 0 },
    { name: "경기/김포시", lat: 37.59417, lng: 126.7425, count: 0 },
    { name: "경기/남양주시", lat: 37.65217, lng: 127.2401, count: 0 },
    { name: "경기/동두천시", lat: 37.91889, lng: 127.06897, count: 0 },
    { name: "경기/부천시", lat: 37.49889, lng: 126.78306, count: 0 },
    { name: "경기/성남시", lat: 37.41875, lng: 127.12877, count: 0 },
    { name: "경기/수원시", lat: 37.28586, lng: 127.00993, count: 0 },
    { name: "경기/시흥시", lat: 37.39067, lng: 126.7888, count: 0 },
    { name: "경기/안산시", lat: 37.31693, lng: 126.83048, count: 0 },
    { name: "경기/안성시", lat: 37.03789, lng: 127.30057, count: 0 },
    { name: "경기/안양시", lat: 37.3925, lng: 126.92694, count: 0 },
    { name: "경기/양주시", lat: 37.81732, lng: 127.046, count: 0 },
    { name: "경기/양평군", lat: 37.4888, lng: 127.49222, count: 0 },
    { name: "경기/여주시", lat: 37.29562, lng: 127.63668, count: 0 },
    { name: "경기/연천군", lat: 38.09404, lng: 127.07577, count: 0 },
    { name: "경기/오산시", lat: 37.15222, lng: 127.07056, count: 0 },
    { name: "경기/용인시", lat: 37.23825, lng: 127.17795, count: 0 },
    { name: "경기/의왕시", lat: 37.345, lng: 126.97575, count: 0 },
    { name: "경기/의정부시", lat: 37.73865, lng: 127.0477, count: 0 },
    { name: "경기/이천시", lat: 37.27917, lng: 127.4425, count: 0 },
    { name: "경기/파주시", lat: 37.75952, lng: 126.77772, count: 0 },
    { name: "경기/평택시", lat: 36.99472, lng: 127.08889, count: 0 },
    { name: "경기/포천시", lat: 37.8937, lng: 127.20028, count: 0 },
    { name: "경기/하남시", lat: 37.53895, lng: 127.2125, count: 0 },
    { name: "경기/화성시", lat: 37.20025, lng: 126.82909, count: 0 },
    { name: "강원/원주시", lat: 37.32104, lng: 127.92132, count: 0 },
    { name: "강원/춘천시", lat: 37.88048, lng: 127.72776, count: 0 },
    { name: "강원/강릉시", lat: 37.7519, lng: 128.87825, count: 0 },
    { name: "강원/동해시", lat: 37.52345, lng: 129.11357, count: 0 },
    { name: "강원/속초시", lat: 38.20725, lng: 128.59275, count: 0 },
    { name: "강원/삼척시", lat: 37.45013, lng: 129.16626, count: 0 },
    { name: "강원/홍천군", lat: 37.6918, lng: 127.8857, count: 0 },
    { name: "강원/태백시", lat: 37.1652, lng: 128.9857, count: 0 },
    { name: "강원/철원군", lat: 38.24391, lng: 127.44522, count: 0 },
    { name: "강원/횡성군", lat: 37.48817, lng: 127.9857, count: 0 },
    { name: "강원/평창군", lat: 37.37028, lng: 128.39306, count: 0 },
    { name: "강원/영월군", lat: 37.1833, lng: 128.4615, count: 0 },
    { name: "강원/정선군", lat: 37.38911, lng: 128.72995, count: 0 },
    { name: "강원/인제군", lat: 38.04416, lng: 128.27876, count: 0 },
    { name: "강원/고성군", lat: 38.37945, lng: 128.46755, count: 0 },
    { name: "강원/양양군", lat: 38.06215, lng: 128.61471, count: 0 },
    { name: "강원/화천군", lat: 38.14212, lng: 127.67615, count: 0 },
    { name: "강원/양구군", lat: 38.10583, lng: 127.98944, count: 0 },
    { name: "세종/세종시", lat: 36.4800121, lng: 127.2890691, count: 0 },
    { name: "충북/청주시", lat: 36.63722, lng: 127.48972, count: 0 },
    { name: "충북/충주시", lat: 37.01791, lng: 127.87713, count: 0 },
    { name: "충북/제천시", lat: 37.06206, lng: 128.14065, count: 0 },
    { name: "충북/보은군", lat: 36.49489, lng: 127.72865, count: 0 },
    { name: "충북/옥천군", lat: 36.3012, lng: 127.568, count: 0 },
    { name: "충북/영동군", lat: 36.1645, lng: 127.79018, count: 0 },
    { name: "충북/증평군", lat: 36.78377, lng: 127.59858, count: 0 },
    { name: "충북/진천군", lat: 36.85667, lng: 127.44333, count: 0 },
    { name: "충북/괴산군", lat: 36.77179, lng: 127.81426, count: 0 },
    { name: "충북/음성군", lat: 36.92602, lng: 127.6807, count: 0 },
    { name: "충북/단양군", lat: 36.98615, lng: 128.36945, count: 0 },
    { name: "충남/천안시", lat: 36.80488, lng: 127.19431, count: 0 },
    { name: "충남/공주시", lat: 36.45556, lng: 127.12472, count: 0 },
    { name: "충남/보령시", lat: 36.35649, lng: 126.59444, count: 0 },
    { name: "충남/아산시", lat: 36.78361, lng: 127.00417, count: 0 },
    { name: "충남/서산시", lat: 36.78518, lng: 126.46568, count: 0 },
    { name: "충남/논산시", lat: 36.19774, lng: 127.12143, count: 0 },
    { name: "충남/계룡시", lat: 36.29304, lng: 127.22575, count: 0 },
    { name: "충남/당진시", lat: 36.91667, lng: 126.66667, count: 0 },
    { name: "충남/금산군", lat: 36.13381, lng: 127.48062, count: 0 },
    { name: "충남/부여군", lat: 36.26257, lng: 126.85802, count: 0 },
    { name: "충남/서천군", lat: 36.1082, lng: 126.69722, count: 0 },
    { name: "충남/청양군", lat: 36.44586, lng: 126.84288, count: 0 },
    { name: "충남/홍성군", lat: 36.56705, lng: 126.62626, count: 0 },
    { name: "충남/예산군", lat: 36.68218, lng: 126.79592, count: 0 },
    { name: "충남/태안군", lat: 36.70036, lng: 126.28391, count: 0 },
    { name: "경북/포항시", lat: 36.08333, lng: 129.36667, count: 0 },
    { name: "경북/경주시", lat: 35.84278, lng: 129.21167, count: 0 },
    { name: "경북/김천시", lat: 36.14481, lng: 128.11157, count: 0 },
    { name: "경북/안동시", lat: 36.56636, lng: 128.72275, count: 0 },
    { name: "경북/구미시", lat: 36.21009, lng: 128.35442, count: 0 },
    { name: "경북/영주시", lat: 36.87459, lng: 128.58631, count: 0 },
    { name: "경북/영천시", lat: 36, lng: 129, count: 0 },
    { name: "경북/상주시", lat: 36.41667, lng: 128.16667, count: 0 },
    { name: "경북/문경시", lat: 36.59458, lng: 128.19946, count: 0 },
    { name: "경북/경산시", lat: 35.83333, lng: 128.8, count: 0 },
    { name: "경북/군위군", lat: 36.16995, lng: 128.64705, count: 0 },
    { name: "경북/의성군", lat: 36.36122, lng: 128.61517, count: 0 },
    { name: "경북/청송군", lat: 36.43288, lng: 129.05159, count: 0 },
    { name: "경북/영양군", lat: 36.69592, lng: 129.14196, count: 0 },
    { name: "경북/영덕군", lat: 36.48125, lng: 129.31078, count: 0 },
    { name: "경북/청도군", lat: 35.67166, lng: 128.78509, count: 0 },
    { name: "경북/고령군", lat: 35.74959, lng: 128.29707, count: 0 },
    { name: "경북/성주군", lat: 35.91888, lng: 128.28838, count: 0 },
    { name: "경북/칠곡군", lat: 36.01512, lng: 128.46138, count: 0 },
    { name: "경북/예천군", lat: 36.65272, lng: 128.43007, count: 0 },
    { name: "경북/봉화군", lat: 36.88951, lng: 128.73573, count: 0 },
    { name: "경북/울진군", lat: 36.91968, lng: 129.31966, count: 0 },
    { name: "경북/울릉군", lat: 37.50442, lng: 130.86084, count: 0 },
    { name: "경남/창원시", lat: 35.27533, lng: 128.65152, count: 0 },
    { name: "경남/김해시", lat: 35.25, lng: 128.86667, count: 0 },
    { name: "경남/진주시", lat: 35.20445, lng: 128.12408, count: 0 },
    { name: "경남/양산시", lat: 35.39866, lng: 129.03612, count: 0 },
    { name: "경남/거제시", lat: 34.9, lng: 128.66666, count: 0 },
    { name: "경남/통영시", lat: 34.8736, lng: 128.39709, count: 0 },
    { name: "경남/사천시", lat: 35.00385, lng: 128.06857, count: 0 },
    { name: "경남/밀양시", lat: 35.49333, lng: 128.74889, count: 0 },
    { name: "경남/함안군", lat: 35.29117, lng: 128.4297, count: 0 },
    { name: "경남/거창군", lat: 35.68735, lng: 127.91142, count: 0 },
    { name: "경남/창녕군", lat: 35.50822, lng: 128.4902, count: 0 },
    { name: "경남/고성군", lat: 35.01478, lng: 128.28244, count: 0 },
    { name: "경남/하동군", lat: 35.13628, lng: 127.77291, count: 0 },
    { name: "경남/합천군", lat: 35.5741, lng: 128.13841, count: 0 },
    { name: "경남/남해군", lat: 34.80433, lng: 127.92708, count: 0 },
    { name: "경남/함양군", lat: 35.55233, lng: 127.71196, count: 0 },
    { name: "경남/산청군", lat: 35.36625, lng: 127.87065, count: 0 },
    { name: "경남/의령군", lat: 35.3923, lng: 128.26917, count: 0 },
    { name: "전북/전주시", lat: 35.82194, lng: 127.14889, count: 0 },
    { name: "전북/익산시", lat: 35.94389, lng: 126.95444, count: 0 },
    { name: "전북/군산시", lat: 35.93583, lng: 126.68338, count: 0 },
    { name: "전북/정읍시", lat: 35.6, lng: 126.91667, count: 0 },
    { name: "전북/완주군", lat: 35.84509, lng: 127.14752, count: 0 },
    { name: "전북/김제시", lat: 35.80701, lng: 126.90755, count: 0 },
    { name: "전북/남원시", lat: 35.42966, lng: 127.43208, count: 0 },
    { name: "전북/고창군", lat: 35.43483, lng: 126.70047, count: 0 },
    { name: "전북/부안군", lat: 35.7, lng: 126.66667, count: 0 },
    { name: "전북/임실군", lat: 35.6066, lng: 127.2301, count: 0 },
    { name: "전북/순창군", lat: 35.41667, lng: 127.16667, count: 0 },
    { name: "전북/진안군", lat: 35.8216, lng: 127.41183, count: 0 },
    { name: "전북/장수군", lat: 35.66667, lng: 127.53333, count: 0 },
    { name: "전북/무주군", lat: 35.93172, lng: 127.71118, count: 0 },
    { name: "전남/여수시", lat: 34.77647, lng: 127.64253, count: 0 },
    { name: "전남/순천시", lat: 34.98951, lng: 127.39551, count: 0 },
    { name: "전남/목포시", lat: 34.80826, lng: 126.3942, count: 0 },
    { name: "전남/광양시", lat: 35.02926, lng: 127.64882, count: 0 },
    { name: "전남/나주시", lat: 35.05683, lng: 126.67362, count: 0 },
    { name: "전남/무안군", lat: 34.95642, lng: 126.44041, count: 0 },
    { name: "전남/해남군", lat: 34.54047, lng: 126.5187, count: 0 },
    { name: "전남/고흥군", lat: 34.58333, lng: 127.33333, count: 0 },
    { name: "전남/화순군", lat: 35.00843, lng: 127.02576, count: 0 },
    { name: "전남/영암군", lat: 34.7979, lng: 126.62651, count: 0 },
    { name: "전남/영광군", lat: 35.28711, lng: 126.43616, count: 0 },
    { name: "전남/완도군", lat: 34.31182, lng: 126.73845, count: 0 },
    { name: "전남/담양군", lat: 35.33976, lng: 126.99125, count: 0 },
    { name: "전남/장성군", lat: 35.32734, lng: 126.76817, count: 0 },
    { name: "전남/보성군", lat: 34.81426, lng: 127.15765, count: 0 },
    { name: "전남/신안군", lat: 34.8262, lng: 126.10863, count: 0 },
    { name: "전남/장흥군", lat: 34.66667, lng: 126.91667, count: 0 },
    { name: "전남/강진군", lat: 34.61787, lng: 126.76758, count: 0 },
    { name: "전남/함평군", lat: 35.11641, lng: 126.53221, count: 0 },
    { name: "전남/진도군", lat: 34.41018, lng: 126.1688, count: 0 },
    { name: "전남/곡성군", lat: 35.21449, lng: 127.2628, count: 0 },
    { name: "전남/구례군", lat: 35.20944, lng: 127.46444, count: 0 },
    { name: "제주/제주시", lat: 33.50972, lng: 126.52194, count: 0 },
    { name: "제주/서귀포시", lat: 33.29307, lng: 126.49748, count: 0 },
  ]);

  useEffect(() => {
    setReviewDatas(reviewData);
  }, []);
  useEffect(() => {
    countSet();
    sigunguCountSet();
  }, [reviewDatas]);

  const countSet = () => {
    reviewDatas.forEach((review: any) => {
      const pattern = /\s/g;
      setSido((prev) =>
        prev.map((sg) =>
          sg.name === review.sido ? { ...sg, count: sg.count + 1 } : sg
        )
      );
    });
  };
  const sigunguCountSet = () => {
    reviewDatas.forEach((review: any) => {
      let reviewSigungu = review.sigungu;
      setSigungu((prev) =>
        prev.map((si: any): any => {
          let [sido, sigungu] = si.name.split("/");
          let space = /[\s]/g;
          if (space.test(reviewSigungu)) {
            const splitted = reviewSigungu.split(" ");
            reviewSigungu = splitted[0];
          }

          if (sido === review.sido && sigungu === reviewSigungu)
            return { ...si, count: si.count + 1 };
          else return si;
        })
      );
    });
  };
  const returnSigungu = (name: string): string => {
    const [sido, sigungu] = name.split("/");
    return sigungu;
  };
  return (
    <>
      <Map // 지도를 표시할 Container
        center={center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "650px",
        }}
        level={zoomLevel} // 지도의 확대 레벨
        onZoomChanged={(map) => setZoomLevel(map.getLevel())}
        isPanto={false}
      >
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={6} // 클러스터 할 최소 지도 레벨
        >
          {zoomLevel < 8 &&
            reviewDatas.map((reviewData: any, idx: any): any => (
              <React.Fragment
                key={`customoverlay_${reviewData.lat}-${reviewData.lng}`}
              >
                <CustomOverlayMap //건물 표시
                  position={{
                    lat: reviewData.lat,
                    lng: reviewData.lng,
                  }}
                  yAnchor={2.2}
                >
                  <CustomDiv
                    style={{ background: "rgb(255,255, 255,0.2)" }}
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
                  setCenter({ lat: root.location[0], lng: root.location[1] });
                  setZoomLevel(9);
                }}
                style={
                  root.count > 0
                    ? { backgroundColor: "rgb(59, 255, 0, 0.6)" }
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
                  setCenter({ lat: sigungu.lat, lng: sigungu.lng });
                  setZoomLevel(7);
                }}
                style={
                  sigungu.count > 0
                    ? { backgroundColor: "rgb(59, 255, 0, 0.6)" }
                    : {}
                }
              >
                <div>{returnSigungu(sigungu.name)}</div>{" "}
                <div style={{ color: "red" }}>{sigungu.count}</div>
              </CustomDiv>
            </CustomOverlayMap>
          ))}
      </Map>

      <button onClick={() => console.log(sido)}>버튼 </button>
    </>
  );
}

const CustomDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  color: black;
  text-align: center;
  padding: 7px;
  font-size: 0.9rem;
  border-radius: 30px;
  background: transparent;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgb(204, 255, 188, 0.3);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 10px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  &:hover {
    background-color: rgb(199, 208, 247, 0.6);
  }
`;
export default MapCluster;
