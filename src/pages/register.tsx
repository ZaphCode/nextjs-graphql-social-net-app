import { gql } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import client from "../lib/apollo_client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   return {
//     props: {},
//   };
// };

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  const LOGIN_MUTATION = gql`
    mutation ($input: RegisterInput) {
      register(input: $input)
    }
  `;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    toast.promise(
      client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { input: { email, password, username } },
      }),
      {  
        loading: "Loading",
        success: (res) => {
          setTimeout(() => {
            push("/");
          }, 1000);
          return res.data.register;
        },
        error: (err) => `${err}`,
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Submit</button>
        <Toaster position="top-right" />
      </form>
    </div>
  );
};

export default Login;
