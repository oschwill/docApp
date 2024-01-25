import axios from 'axios';

export const getData = async (urlParams) => {
  const data = await axios.get(`${import.meta.env.VITE_API_URL}${urlParams}`);
  return data;
};

export const sendData = async (method, urlParams, data = null, headers = {}) => {
  const url = `${import.meta.env.VITE_API_URL}${urlParams}`;
  //
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response;
  } catch (error) {
    return error;
  }
};
