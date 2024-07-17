import Link from "next/link";
import SignUpForm from "./form";

export default function page() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
        <section className="w-full max-w-lg  flex flex-col items-center py-8">
            <h2 className="text-center text-xl mb-4 font-semibold">Sign Up</h2>
            <div className="w-full px-8">
                <SignUpForm/>
                <p className="my-4 text-center">Already have an account? 
                    <Link href={'/signin'} className="underline">{" "}Sign In</Link>
                </p>
            </div>
        </section>
    </div>
    )
  }
  