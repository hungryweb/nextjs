import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col p-24">
      <Link href="/c/dormitor">Dormitor</Link>
      <Link href="/c/dormitor/seturi-dormitoare">* Seturi dormitoare</Link>
      <Link href="/c/dormitor/seturi-dormitoare/dormitoare-pat-incadrat">** Dormitoare pat incadrat</Link>
    </main>
  )
}
