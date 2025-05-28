import { createNewUser } from "../../utils/prismaQueries";
import Spinner from "../components/Spinner";
import { redirect } from "next/navigation";

const NewUser = async () => {
  try {
    await createNewUser();
  } catch (error) {
    console.error("Error creating new user:", error);
    redirect("/sign-in");
  }

  return <Spinner />;
};

export default NewUser;
