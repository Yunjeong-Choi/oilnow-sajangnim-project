# oilnow-sajangnim-project

### 0. 목표
   - 오일나우에서 주유소 간편결제가 가능하다는 가정하에 필요할 <br/>
     사장님 결제관리 페이지 제작해보자
     
     ![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/85290084/147054295-c666867b-ad0a-47ca-a459-e01f271c42ec.gif)
	
### 1. 기술스택
   - Front-End: `JavaScript, TypeScript, React.js, Styled-Components`
   - Other: `Figma`

### 2. 기능
   - Virtual List (Throttle)
   - 검색필터 (Debounce)
   - Lazy Loading
   - Image Carousel

### 3. 구성
   ![Slide 16_9 - 29](https://user-images.githubusercontent.com/85290084/147054024-dc283919-98ae-4971-9b2a-4c9aa4a9ea98.png)

### 4. 개발과정 (+ 기획, 디자인)
   1. [프로젝트의 시작](https://velog.io/@parfaite73/1.-%ED%86%A0%EC%9D%B4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-%ED%95%B4%EB%B3%B4%EC%9E%90)
   2. [서비스 유저는 누구인가](https://velog.io/@parfaite73/2.-%ED%83%80%EA%B9%83-%EB%B6%84%EC%84%9D-%EC%A3%BC%EC%9C%A0%EC%86%8C-%EA%B0%84%ED%8E%B8%EA%B2%B0%EC%A0%9C%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EB%AF%BC)
   3. [주유소 간편결제 플로우에 대한 고민...](https://velog.io/@parfaite73/Project1-3-%EC%A3%BC%EC%9C%A0%EC%86%8C-%EA%B0%84%ED%8E%B8%EA%B2%B0%EC%A0%9C-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EB%AF%BC)
   4. [페이지 구성 / 디자인 / 개발개요](https://velog.io/@parfaite73/Project1-4-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%EC%84%B1-%EB%B0%8F-%EB%94%94%EC%9E%90%EC%9D%B8)
   5. [Virtual List 직접 구현하기 (feat. useThrottle)](https://velog.io/@parfaite73/Project1-5-Virtual-ListThrottle-feat.Express-%EC%84%9C%EB%B2%84)
   6. [Express 웹서버 만들기 (feat. Pagination)](https://velog.io/@parfaite73/Project1-6-Express-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0)
   7. [검색필터: 여러개 조건으로 검색하기 (feat. Debounce, 날짜비교)](https://velog.io/@parfaite73/Project1-7-%EA%B2%80%EC%83%89%ED%95%84%ED%84%B0-%EC%97%AC%EB%9F%AC%EA%B0%9C-%EC%A1%B0%EA%B1%B4%EC%9C%BC%EB%A1%9C-%EA%B2%80%EC%83%89%ED%95%98%EA%B8%B0-feat.-react-datepicker-Debounce)
   8. [화면이동, 데이터넘기기 그리고 모달](https://velog.io/@parfaite73/Project1-8-%ED%99%94%EB%A9%B4%EC%9D%B4%EB%8F%99-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%84%98%EA%B8%B0%EA%B8%B0-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%AA%A8%EB%8B%AC)
   9. [Lazy Loading (w/ Intersection Observer API)](https://velog.io/@parfaite73/Project1-9-%EB%A0%88%EC%9D%B4%EC%A7%80%EB%A1%9C%EB%94%A9)
   10. [Image Carousel 만들기](https://velog.io/@parfaite73/Project1-10-Image-Carousel-%EB%A7%8C%EB%93%A4%EA%B8%B0)
   11. [사이드메뉴 열고 닫기 (w/ 애니메이션)](https://velog.io/@parfaite73/Project1-11-%EC%82%AC%EC%9D%B4%EB%93%9C%EB%A9%94%EB%89%B4-%EC%97%B4%EA%B3%A0-%EB%8B%AB%EA%B8%B0-w-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98)

### 5. 실행방법
   - 가장 먼저 web server를 실행시켜 주세요. (server 디렉토리에서 `yarn start`)
   - 그 다음 react app을 실행시킵니다. (front 디렉토리에서 `yarn start`)
   
![83F99757-C2B7-413A-A2CE-4D8614048A7A](https://user-images.githubusercontent.com/85290084/147055132-a9d0589c-d07b-4c05-8c18-7248a3c00b3e.jpg)
