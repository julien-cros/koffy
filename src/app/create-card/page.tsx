import FormPage from "@/components/FormPage";
import Modal from "@/components/Modal";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateCard = async () => {
  const session = await getCurrentUser();

  if (!session || !session?.user) {
    redirect("/");
  }

  return (
    <div >
      <Modal>
        <h3 className="flex justify-start flex-col absolute md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full">
          You tasted a new Coffee!
        </h3>
        <div className="">
          <FormPage type="create" session={session} />
        </div>
      </Modal>
    </div>
  );
};

export default CreateCard;
