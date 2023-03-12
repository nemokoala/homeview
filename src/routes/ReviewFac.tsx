import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styles from "./ReviewFac.module.css";

function ReviewFac() {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [sido, setSido] = useState<string>("");
  const [address, setAddress] = useState("");
  const [oldAddress, setOldAddress] = useState<string>("");
  const [buildingName, setBuildingName] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [residenceFloor, setResidenceFloor] = useState("");
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const [livedYear, setLivedYear] = useState(0);
  const [star, setStar] = useState(0);
  const [addressTitle, setAddressTitle] = useState("클릭하여 주소 검색");

  let now = new Date();
  let nowYear = now.getFullYear();
  let years = new Array(nowYear - 2020);
  for (let i = 2021; i <= nowYear; i++) {
    years[i - 2021] = i;
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
      setAddress(data.roadAddress);
      setOldAddress(data.jibunAddress);
      setSido(data.sido);
      setAddressTitle("클릭하여 주소 변경");
      if (data.buildingName == "") setBuildingName(data.roadAddress);
      console.log(`
              주소: ${data.roadAddress},
              우편번호: ${data.zonecode},
              지번 : ${data.jibunAddress},
              시도 : ${data.sido}
          `);
      setOpenPostcode(false);
    },
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "strength") setStrength(value);
    if (name === "weakness") setWeakness(value);
    console.log(strength, weakness);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="address">주소</label>
        <div
          id="address"
          className={`${styles.addressInput} ${address == "" || styles.active}`}
          onClick={() => setOpenPostcode(true)}
          title={addressTitle}
        >
          {address == "" ? (
            <>클릭하여 주소 검색</>
          ) : (
            <div className={styles.addressInformation}>
              <div>{buildingName}</div>
              <div>{address}</div>
              <div>{oldAddress}</div>
            </div>
          )}
        </div>
        <label>거주유형</label>
        <div className={styles.buttons}>
          <div
            className={`${styles.mediumBtn} ${
              residenceType == "아파트" && styles.active
            }`}
            onClick={() => setResidenceType("아파트")}
          >
            아파트
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceType == "오피스텔" && styles.active
            }`}
            onClick={() => setResidenceType("오피스텔")}
          >
            오피스텔
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceType == "원룸/주택/빌라" && styles.active
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
              residenceFloor == "저층" && styles.active
            }`}
            onClick={() => setResidenceFloor("저층")}
          >
            저층
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceFloor == "중층" && styles.active
            }`}
            onClick={() => setResidenceFloor("중층")}
          >
            중층
          </div>
          <div
            className={`${styles.mediumBtn} ${
              residenceFloor == "고층" && styles.active
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
                livedYear == year && styles.active
              }`}
              onClick={() => setLivedYear(year)}
            >
              {year}년까지
            </div>
          ))}
        </div>
        <label>장점</label>
        <input
          value={strength}
          name="strength"
          onChange={onChange}
          placeholder="장점"
        />
        <label>단점</label>
        <input
          value={weakness}
          name="weakness"
          onChange={onChange}
          placeholder="단점"
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
          <div className={styles.mediumBtn}>취소</div>
          <div className={styles.mediumBtn}>제출</div>
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
              defaultQuery="고봉로 34길" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewFac;
