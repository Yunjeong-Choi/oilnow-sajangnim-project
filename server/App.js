const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3303;
const data = require("./database.json");

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running... ${PORT}`);
});

app.get("/payData", (req, res) => {
  const payData = data.payData;
  res.send(payData);
  console.log(`GET! ${req.path}`);
});

//페이지네이션//
// app.get("/payData", (req, res) => {
//   const payData = data.payData;
//   const pageInfo = req.query;
//   const page = parseInt(pageInfo.page);
//   const pageSize = parseInt(pageInfo.pageSize);
//   // const payDataLength = payData.length;
//   // const totalPage =
//   //   payDataLength % pageSize
//   //     ? parseInt(payDataLength / pageSize) + 1
//   //     : parseInt(payDataLength / pageSize);

//   // //TODO: page 혹은 pageSize가 없는 경우
//   // if (!page) {
//   //   //에러
//   // }

//   // //TODO: page가 총 페이지수를 초과한 경우
//   // if(page>totalPage){
//   //   //에러
//   // }

//   const startIndex = page * pageSize;
//   const endIndex = startIndex + pageSize;
//   const requestedPayData = payData.slice(startIndex, endIndex);

//   res.send(requestedPayData);
//   console.log(
//     `GET! ${req.path}`,
//     `page: ${page}`,
//     `pageSize: ${pageSize}`
//     // `payData: ${payData}`
//   );
// });
