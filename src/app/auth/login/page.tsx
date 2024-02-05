import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "~/components/login-form"
import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"

export const metadata: Metadata = {
    title: "Login",
}

export default function LoginPage() {
    return (
        <div className="w-80 gap-3 flex flex-col">
            <Link className={cn(buttonVariants({variant: "ghost"}), "absolute top-6 right-6")} href="/auth/signup">Sign up</Link>
            <h1 className="text-2xl font-semibold text-center">Login to your account</h1>
            <LoginForm />
        </div>
    )
}
