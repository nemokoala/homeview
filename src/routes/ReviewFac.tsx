import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import styles from "./ReviewFac.module.css";

function ReviewFac({ setReviewData }: any) {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [sido, setSido] = useState<string>("");
  const [sigungu, setSigungu] = useState<string>("");
  const [newAddress, setNewAddress] = useState("");
  const [oldAddress, setOldAddress] = useState<string>("");
  const [buildingName, setBuildingName] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [residenceFloor, setResidenceFloor] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [livedYear, setLivedYear] = useState(0);
  const [star, setStar] = useState(0);
  const [addressTitle, setAddressTitle] = useState("클릭하여 주소 검색");
  const [lat, setLat] = useState(0); //위도 35.xx
  const [lng, setLng] = useState(0); //경도 127.xx
  const navigate = useNavigate();
  let now = new Date();
  let nowYear = now.getFullYear();
  let years = new Array(nowYear - 2020);
  for (let i = 2020; i <= nowYear; i++) {
    years[i - 2020] = i;
  }
  years.reverse();
  /**
   * handler
   */
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setBuildingName(data.buildingName);
      setNewAddress(data.roadAddress);
      setOldAddress(data.jibunAddress);
      setSido(data.sido);
      setAddressTitle("클릭하여 주소 변경");
      setSigungu(data.sigungu);
      if (data.buildingName === "") {
        const newBuilding = data.roadAddress
          .replace(data.sido, "")
          .replace(data.sigungu, "")
          .trim();
        setBuildingName(newBuilding);
      }
      if (data.sido === "세종특별자치시") {
        setSido("세종");
        setSigungu("세종시");
      }
      if (data.sido === "제주특별자치도") setSido("제주");
      if (data.sido)
        console.log(`
              주소: ${data.roadAddress},
              우편번호: ${data.zonecode},
              지번 : ${data.jibunAddress},
              시도 : ${data.sido},
              시군구: ${data.sigungu},
              
          `);
      let geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        data.roadAddress,
        function (result: any, status: any): any {
          // 정상적으로 검색이 완료됐으면
          if (status == kakao.maps.services.Status.OK) {
            setLat(result[0].y);
            setLng(result[0].x);
            console.log(lat, lng);
          }
        }
      );
      setOpenPostcode(false);
    },
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "pros") setPros(value);
    if (name === "cons") setCons(value);
    console.log(pros, cons);
  };

  const sendReview = () => {
    if (buildingName === "") alert("주소를 입력해주세요.");
    else if (residenceType === "") alert("거주유형을 선택해주세요");
    else if (residenceFloor === "") alert("거주층을 선택해주세요");
    else if (livedYear === 0) alert("거주년도를 선택해주세요.");
    else if (pros === "") alert("장점을 입력해주세요.");
    else if (cons === "") alert("단점을 입력해주세요.");
    else if (star === 0) alert("별점을 선택해주세요.");
    else {
      setReviewData((prev: any) => [
        ...prev,
        {
          reviewId: Math.floor(Math.random() * 10000) + 1,
          building: buildingName,
          newAddress: newAddress,
          oldAddress: oldAddress,
          pros: pros,
          cons: cons,
          residenceType: residenceType,
          residenceFloor: residenceFloor,
          livedYear: livedYear,
          star,
          lat,
          lng,
          sido,
          sigungu,
        },
      ]);

      navigate("/review");
      alert("리뷰작성이 완료되었습니다!");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="address">주소</label>
        <div
          id="address"
          className={`${styles.addressInput} ${
            newAddress === "" || styles.active
          }`}
          onClick={() => setOpenPostcode(true)}
          title={addressTitle}
        >
          {newAddress === "" ? (
            <>클릭하여 주소 검색</>
          ) : (
            <div className={styles.addressInformation}>
              <div>{buildingName}</div>
              <div>{newAddress}</div>
              <div>{oldAddress}</div>
            </div>
          )}
        </div>
        <label>거주유형</label>
        <div className={styles.buttons}>
          <div
            className={`${styles.mediumBtn} ${
              residenceType === "아파트" && styles.active
            }`}
            onClick={() => setResidenceType("아파트")}
          >
            아파트
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceType === "오피스텔" && styles.active
            }`}
            onClick={() => setResidenceType("오피스텔")}
          >
            오피스텔
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceType === "원룸/주택/빌라" && styles.active
            }`}
            onClick={() => setResidenceType("원룸/주택/빌라")}
          >
            원룸/주택/빌라
          </div>
        </div>
        <label>거주층</label>
        <div className={styles.buttons}>
          <div
            className={`${styles.mediumBtn} ${
              residenceFloor === "저층" && styles.active
            }`}
            onClick={() => setResidenceFloor("저층")}
          >
            저층
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceFloor === "중층" && styles.active
            }`}
            onClick={() => setResidenceFloor("중층")}
          >
            중층
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceFloor === "고층" && styles.active
            }`}
            onClick={() => setResidenceFloor("고층")}
          >
            고층
          </div>
        </div>
        <label>거주년도</label>
        <div className={styles.buttons}>
          {years.map((year) => (
            <div
              key={year}
              className={`${styles.mediumBtn} ${
                livedYear === year && styles.active
              }`}
              onClick={() => setLivedYear(year)}
            >
              {year}년까지
            </div>
          ))}
        </div>
        <label>장점</label>
        <textarea
          value={pros}
          name="pros"
          onChange={onChange}
          placeholder="장점 최대 100글자"
          rows={1}
          maxLength={100}
        />
        <label>단점</label>
        <textarea
          value={cons}
          name="cons"
          onChange={onChange}
          placeholder="단점 최대 100글자"
          rows={1}
          maxLength={100}
        />
        <label>총 별점</label>
        <div className={styles.stars}>
          <div
            className={`${styles.star} ${star >= 1 ? styles.active : null}`}
            onClick={() => setStar(1)}
          >
            ★
          </div>
          <div
            className={`${styles.star} ${star >= 2 ? styles.active : null}`}
            onClick={() => setStar(2)}
          >
            ★
          </div>
          <div
            className={`${styles.star} ${star >= 3 ? styles.active : null}`}
            onClick={() => setStar(3)}
          >
            ★
          </div>
          <div
            className={`${styles.star} ${star >= 4 ? styles.active : null}`}
            onClick={() => setStar(4)}
          >
            ★
          </div>
          <div
            className={`${styles.star} ${star >= 5 ? styles.active : null}`}
            onClick={() => setStar(5)}
          >
            ★
          </div>
        </div>
        <div className={styles.submitBtns}>
          <div className={styles.mediumBtn} onClick={() => navigate("/review")}>
            취소
          </div>
          <div className={styles.mediumBtn} onClick={sendReview}>
            제출
          </div>
        </div>
      </form>

      <div>
        {openPostcode && (
          <>
            <div
              className={styles.topContainer}
              onClick={() => setOpenPostcode(false)}
            >
              주소 검색 X
            </div>
            <DaumPostcode
              className={styles.daumAddressForm}
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewFac;