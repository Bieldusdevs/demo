export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={"px-5 py-2.5 rounded-xl bg-white text-black font-medium "+(props.className||"")} />
}
export function Card({children}:{children:React.ReactNode}) {
  return <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">{children}</div>
}
