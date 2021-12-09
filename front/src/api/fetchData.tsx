import axios from "axios";

const fetchData = async (page: number, pageSize = 30) => {
  try {
    const response = await axios.get(
      `http://localhost:3303/payData?page=${page}&pageSize=${pageSize}`
    );
    const payData = response.data;
    return payData;
  } catch (error) {
    console.log("error!", error);
    return error;
  }
};

// const fetchData = async (page: number, pageSize = 30) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3303/data?page=${page}&pageSize=${pageSize}`
//     );
//     const resultList = response.data;
//     return resultList;
//   } catch (error) {
//     console.log("error!", error);
//     return error;
//   }
// };

export default fetchData;
