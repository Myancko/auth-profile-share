'use client'

import Link from 'next/link'

export default function NotFound() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>A pagina que voice tentou acessar não existe</h1>
      <Link href="/sign-in" className="text-blue-400 underline hover:text-blue-600"><p>Voltar</p></Link>
    </div>
  );
}
