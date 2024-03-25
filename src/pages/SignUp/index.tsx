import { GetServerSideProps } from "next";
import SignUpComponent from "../../components/SignUpComponent";
import { api } from "~/utils/api";


const SignUp = ()=>{
  return (
    <>
      <div>
        <SignUpComponent />
      </div>
    </>
  );
};

export default SignUp