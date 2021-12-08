import axios from "axios";

const URL = "http://localhost:3303/data";

const fetchData = async () => {
  try {
    const response = await axios.get(URL);
    const resultList = response.data;
    return resultList;
  } catch (error) {
    console.log("error!", error);
    return error;
  }
};

// const fetchData = async (page: number, step = 30) => {
//   try {
//     const response = await axios.get(URL);
//     const startIndex = page * step;
//     const endIndex = startIndex + step;
//     const resultList = response.data.slice(startIndex, endIndex);
//     return resultList;
//   } catch (error) {
//     console.log("error!", error);
//     return error;
//   }
// };

export default fetchData;
