import type { PropsWithChildren } from 'react';
import { Sidebar } from '@/components/layout/sidebar/Sidebar'

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="basis-4/5">{children}</div>
    </div>
  )
}