import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Next CMS Auth',
  description: '',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
