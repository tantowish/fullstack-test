import Link from "next/link";
import SignInForm from "./form";

export default function page() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
        <section className="w-full max-w-lg  flex flex-col items-center py-8">
            <h2 className="text-center text-xl mb-4 font-semibold">Sign In</h2>
            <div className="w-full px-8">
                <SignInForm/>
                <p className="my-4 text-center">Don&apos;t have an account? 
                    <Link href={'/signup'} className="underline">{" "}Sign Up</Link>
                </p>
            </div>
        </section>
    </div>
    )
  }
  