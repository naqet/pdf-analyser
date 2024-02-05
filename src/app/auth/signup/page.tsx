import type { Metadata } from "next"
import Link from "next/link"
import { SignUpForm } from "~/components/signup-form"
import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"

export const metadata: Metadata = {
    title: "Sign Up",
}

export default function SignUpPage() {
    return (
        <div className="w-80 gap-3 flex flex-col">
            <Link className={cn(buttonVariants({variant: "ghost"}), "absolute top-6 right-6")} href="/auth/login">Login</Link>
            <h1 className="text-2xl font-semibold text-center">Create an account</h1>
            <p className="text-sm text-muted-foreground text-center">
                Enter your email below to create your account
            </p>
            <SignUpForm />
        </div>
    )
}
