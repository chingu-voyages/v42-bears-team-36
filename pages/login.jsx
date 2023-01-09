// import React from "react";
// import { useRouter } from "next/router";
// import { useState } from "react";
// // import LogoutButton from "../components/LogoutButton";
// import handleLogin from "../services/axiosHandleLogin";
// import useCurrentUser from "../hooks/auth/useCurrentUser";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" })
//   const router = useRouter()
  
//   const handleChange = (event) => { 
//     setFormData({ ...formData, [event.target.name]: event.target.value })
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { data } = await handleLogin(formData);
//     console.log(data);
//     if (data.success) {
//       router.push("/dashboard");
//     }
//   }
//   useCurrentUser();

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Email</label>
//         <input type="email" name="email" onChange={handleChange} value={formData.email} />
//         <label htmlFor="password">Password</label>
//         <input type="password" name="password" onChange={handleChange} value={formData.password} />
//         <button type="button">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
