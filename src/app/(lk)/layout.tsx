import type { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <h1>DashboardLayout</h1>
      <div>{children}</div>
    </>
  )
}