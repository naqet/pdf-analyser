type Props = {
    children: React.ReactNode
}
export default function AuthLayout({ children }: Props) {
    return <section className="grid xl:grid-cols-2 min-h-screen">
        <div className="hidden xl:flex flex-col bg-zinc-900 text-white justify-between p-8 min-h-screen">
            <p>Logo</p>
            <div>
                <blockquote>lorem ipsum sdafjdskalfjdskal asdfj ksdajfk sjadf kasjdf k</blockquote>
                <footer>Author</footer>
            </div>
        </div>
        <main className="grid place-items-center">
            {children}
        </main>
    </section>
}
