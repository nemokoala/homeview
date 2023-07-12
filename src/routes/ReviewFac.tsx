import { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import styles from "./ReviewFac.module.css";
import axios from "axios";
import { apiAddress } from "value";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "slice/modalSlice";

function ReviewFac({ setReviewData }: any) {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [sido, setSido] = useState<string>("");
  const [sigungu, setSigungu] = useState<string>("");
  const [newAddress, setNewAddress] = useState("");
  const [oldAddress, setOldAddress] = useState<string>("");
  const [buildingName, setBuildingName] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [star, setStar] = useState(0);
  const [addressTitle, setAddressTitle] = useState("클릭하여 주소 검색");
  const [lat, setLat] = useState(0); //위도 35.xx
  const [lng, setLng] = useState(0); //경도 127.xx
  const [dong, setDong] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [sending, setSending] = useState(false); //리뷰 post 보내는 중인지 체크
  const session = useSelector((state: any) => state.userSet.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInput = useRef<any>();
  useEffect(() => {
    if (!session) {
      dispatch(
        setModal({
          title: "알림",
          titleColor: "red",
          text: "글을 작성하려면 로그인을 해주세요.",
        } as any)
      );
      navigate("/login");
    }
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewSrc(reader.result as any);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewSrc(null);
    }
  }, [selectedFile]);
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
      setDong(data.bname);
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
      if (data.sido === "강원특별자치도") setSido("강원");
      if (data.sido)
        console.log(`
              주소: ${data.roadAddress},
              우편번호: ${data.zonecode},
              지번 : ${data.jibunAddress},
              시도 : ${data.sido},
              시군구: ${data.sigungu},
              동: ${data.bname},
              
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
    e.preventDefault(); //새로고침 방지
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "pros") setPros(value);
    if (name === "cons") setCons(value);
  };
  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const onClickImageUpload = () => {
    fileInput.current.click();
  };
  const onClearAttachment = () => {
    setPreviewSrc(null);
    fileInput.current.value = null;
  };
  const onFileUpload = async () => {
    if (sending) return;
    setSending(true);
    if (!selectedFile) {
      sendReview();
      return;
    }
    const formData = new FormData();
    formData.append("images", selectedFile as any); // 'file'은 스프링 서버에서 사용할 키 값이다.

    try {
      const response = await axios.post(`${apiAddress}/s3/upload`, formData);
      console.log("File Uploaded Successfully:", response);
      if (response.data) {
        setImageLink(response.data);
        sendReview(response.data);
      } else
        dispatch(
          setModal({
            title: "에러",
            titleColor: "red",
            text: "이미지 업로드를 실패하였습니다.",
          } as any)
        );
    } catch (error) {
      const errorText = JSON.stringify(error);
      setSending(false);
      dispatch(
        setModal({
          title: "에러!",
          titleColor: "red",
          text: errorText,
        } as any)
      );
    }
  };
  const sendReview = async (urlImage = imageLink) => {
    if (sending) return;
    if (buildingName === "") {
      alert("주소를 입력해주세요.");
      setSending(false);
    } else if (pros === "") {
      alert("장점을 입력해주세요.");
      setSending(false);
    } else if (cons === "") {
      alert("단점을 입력해주세요.");
      setSending(false);
    } else if (star === 0) {
      alert("별점을 선택해주세요.");
      setSending(false);
    } else {
      try {
        const newReview = {
          room: {
            building: buildingName,
            new_address: newAddress,
            old_address: oldAddress,
            latitude: lat,
            longitude: lng,
            sido,
            sigungu,
            dong,
          },
          url: urlImage,
          pros: pros,
          cons: cons,
          score: star,
        };
        const response = await axios.post(
          `${apiAddress}/review/add`,
          newReview,
          { withCredentials: true }
        );
        console.log(JSON.stringify(response));
        if (response.data === "OK") {
          setSending(false);
          dispatch(
            setModal({
              title: "알림",
              titleColor: "black",
              text: "리뷰 작성을 완료했습니다.",
            } as any)
          );
          navigate("/review");
        }

        if (response.data === "BAD_REQUEST") {
          dispatch(
            setModal({
              title: "알림",
              titleColor: "red",
              text: "이미 작성한 기록이 있는 방 입니다. 새로 작성을 원하시면 기존 리뷰를 삭제 후 다시 작성해주세요.",
            } as any)
          );
        }
      } catch (error: any) {
        setSending(false);
        console.error(JSON.stringify(error));
        let errorText;
        if (error.response.status === 500) errorText = "500 failed";
        else if (error.response.status === 400)
          dispatch(
            setModal({
              title: "알림",
              titleColor: "red",
              text: "이미 작성한 기록이 있는 방 입니다. 새로 작성을 원하시면 기존 리뷰를 삭제 후 다시 작성해주세요.",
            } as any)
          );
        else errorText = error.response.data;
        dispatch(
          setModal({
            title: "에러!",
            titleColor: "red",
            text: errorText,
          } as any)
        );
      }
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
        {/* <label>거주유형</label>
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
        </div> */}
        <label>사진 업로드</label>
        <div className={styles.photoContainer}>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
              ref={fileInput}
            />
            <button onClick={onClickImageUpload}>사진 선택</button>

            {previewSrc && (
              <>
                <button onClick={onClearAttachment}>사진 삭제</button>
                <br />
                <img src={previewSrc as any} alt="이미지를 선택해주세요." />
              </>
            )}
          </div>
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
          <div
            className={styles.mediumBtn}
            onClick={onFileUpload}
            style={{ backgroundColor: sending ? "gray" : "" }}
          >
            {!sending ? "작성 완료" : "작성 중..."}
          </div>
          <div className={styles.mediumBtn} onClick={() => navigate("/review")}>
            취소
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
