export default function Navigation() {
    return (
        <header>
            <div className="mx-auto flex w-full text-xl items-center place-content-between rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <div className="flex w-xl place-content-center items-center gap-24">
                    <div>
                        Home
                    </div>
                    <div>
                        About
                    </div>
                    <div>
                        Reference
                    </div>
                </div>
                <div className="rotate-90 text-4xl">
                    |||
                </div>
            </div>
        </header>
    )
}