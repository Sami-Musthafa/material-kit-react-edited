// const { useEffect, useState } = require('react');

// const Foo = () => {
//   const [userData, setUserData] = useState([]);
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('https://jsonplaceholder.typicode.com/users');
//         if (!res.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await res.json();
//         setUserData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUsers();
//   }, []);
// };
