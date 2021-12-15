import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:3303/payData`);
    const payData = response.data;
    return payData;
  } catch (error) {
    console.log("error!", error);
    return error;
  }
};

//페이지네이션//
// const fetchData = async (page: number, pageSize = 30) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3303/payData?page=${page}&pageSize=${pageSize}`
//     );
//     const payData = response.data;
//     return payData;
//   } catch (error) {
//     console.log("error!", error);
//     return error;
//   }
// };

export default fetchData;
