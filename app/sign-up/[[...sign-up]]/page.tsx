import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <SignUp />
      </div>
    </section>
  );
}
