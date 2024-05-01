import FormPage from "@/components/formPage";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateCard = async () => {
  const session = await getCurrentUser();

  if (!session || !session?.user) {
    redirect("/");
  }

  return <FormPage type="create" session={session} />;
};

export default CreateCard;
