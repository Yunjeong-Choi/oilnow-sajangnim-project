import { useLocation } from "react-router";
import styled from "styled-components";
import { PayDetailInnerBox } from "./PayDetailInfo";
import noImage from "../../../assets/images/noImage-icon.jpg";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import useLazyImage from "../../../hooks/useLazyImage";

interface LazyImageProps {
  observer: IntersectionObserver | null;
  src: string;
  alt: string;
}

const CustomerCancelRequest = () => {
  const location = useLocation();
  const { cancelClaim, cancelImgURL } = location.state;
  const [imageObserver, setImageObserver] =
    useState<IntersectionObserver | null>(null);
  const [translateX, setTranslateX] = useState<number>(0);

  const LazyImage: FunctionComponent<LazyImageProps> = ({
    observer,
    src,
    alt = "no image",
  }) => {
    const imageEl = useRef(null);
    if (!observer) return null;

    useEffect(() => {
      const { current } = imageEl;
      if (!current) return;

      if (observer !== null) {
        observer.observe(current);
      }

      return () => {
        observer.unobserve(current); //TODO: ㅇㅣ게 왜 함수으로 리턴되어야 하는지?
      };
    }, [observer]);

    return (
      <RequestImgBox translateX={translateX}>
        <img ref={imageEl} data-src={src} src={noImage} alt={alt}></img>
      </RequestImgBox>
    );
  };

  useEffect(() => {
    const imageObserver = useLazyImage();
    setImageObserver(imageObserver);

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  return (
    <PayDetailInnerBox>
      <span>고객 취소 요청</span>
      <RequestDetail>
        {cancelClaim.length === 0 ? (
          <RequestText>없음</RequestText>
        ) : (
          <RequestText>{cancelClaim}</RequestText>
        )}
        {cancelImgURL.length === 0 ? (
          <RequestImgBox translateX={0}>
            <span>이미지 없음</span>
          </RequestImgBox>
        ) : (
          <RequestImgList className="RequestImgList">
            {/* TODO: 이미지 클릭하면 크게 볼 수 있는 라이브러리? 필요 */}
            {cancelImgURL.map((image: string, index: number) => (
              <LazyImage
                key={index}
                observer={imageObserver}
                src={image}
                alt="cancel img url"
              />
            ))}
          </RequestImgList>
        )}
      </RequestDetail>
    </PayDetailInnerBox>
  );
};

export default CustomerCancelRequest;

//styled-components
const RequestDetail = styled.div`
  padding: 0 1rem;

  > div:nth-of-type(1) {
    margin-top: 1rem;
    border: 0.07rem solid var(--borderGray);
    border-radius: 0.4rem;
  }
`;

const RequestText = styled.div`
  padding: 0.5em;
  height: 8rem;
  font-size: 1.4rem;
  line-height: 2rem;
`;

const RequestImgList = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 1.3rem;
    border-radius: 0.4rem;
    border: 0.07rem solid var(--borderGray);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--borderGray);
    border-radius: 1rem;
  }
`;

const RequestImgBox = styled.div<{ translateX: number }>`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.07rem solid var(--borderGray);
  border-radius: 0.4rem;
  margin-top: 1rem;
  margin-right: 1rem;

  span {
    font-size: 1.4rem;
  }

  img {
    width: 7rem;
  }
`;
