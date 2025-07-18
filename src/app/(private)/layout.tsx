import PrivateHeader from '@/components/layout/PrivateHeader';
import React from 'react'

export default function PrivateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
        <PrivateHeader />
        {children}
    </>
  )
}
