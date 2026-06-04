import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#0d1020]">
      <SignUp path="/canu/sign-up" routing="path" signInUrl="/canu/sign-in" fallbackRedirectUrl="/canu" />
    </div>
  );
}
