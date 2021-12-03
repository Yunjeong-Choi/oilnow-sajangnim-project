import axios from "axios";

const URL = "http://localhost:3303/data";

const fetchData = async () => {
  try {
    const response = await axios.get(URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error!", error);
    return error;
  }
};

export default fetchData;
