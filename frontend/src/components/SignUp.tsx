import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignProp {
  user_name: string;
  user_surname: string;
  email: string;
  password_hash: string;
  id: number;
}

const SignUp: React.FC = () => {
  const [signData, setSignData] = useState<SignProp>({
    user_name: "",
    user_surname: "",
    email: "",
    password_hash: "",
    id: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5001/user/sign",
        signData
      );
      if (result) {
        alert("User successfully signed in");
        const userId = result.data.id;
        console.log(userId);
        navigate(`/main/${userId}`);
      } else {
        alert("Having troubles signing in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center mt-48">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="rounded-md border bd-2 border-neutral-300 p-2 w-[400px] focus:outline-none mb-3"
          placeholder="Enter your name"
          type="text"
          required
          value={signData.user_name}
          onChange={(e) =>
            setSignData({ ...signData, user_name: e.target.value })
          }
        />
        <input
          className="rounded-md border bd-2 border-neutral-300 p-2 w-[400px] focus:outline-none mb-3"
          placeholder="Enter your username"
          type="text"
          required
          value={signData.user_surname}
          onChange={(e) =>
            setSignData({ ...signData, user_surname: e.target.value })
          }
        />
        <input
          className="rounded-md border bd-2 border-neutral-300 p-2 w-[400px] focus:outline-none mb-3"
          placeholder="Enter your email"
          type="email"
          required
          value={signData.email}
          onChange={(e) => setSignData({ ...signData, email: e.target.value })}
        />
        <input
          className="rounded-md border bd-2 border-neutral-300 p-2 w-[400px] focus:outline-none mb-3"
          placeholder="Enter your password"
          type="password"
          required
          value={signData.password_hash}
          onChange={(e) =>
            setSignData({ ...signData, password_hash: e.target.value })
          }
        />
        <button
          type="submit"
          className="rounded-md border bd-2 border-sky-200 p-2 font-mono w-32"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
