// import { URL } from './constants';

// const checkResponse = (res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   };



// export const getData = async () => {
//     const res = await fetch(URL, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await checkResponse(res);
//     return data;
//   };