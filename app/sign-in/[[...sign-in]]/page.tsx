import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Password: test123</h1>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-slate-500 hover:bg-slate-400",
              footerActionLink: "text-slate-500 hover:text-slate-400",
            },
          }}
          initialValues={{
            emailAddress: "momen+clerk_test@example.com",
          }}
        />
      </div>
    </section>
  );
}
