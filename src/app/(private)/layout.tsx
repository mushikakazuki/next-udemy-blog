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
        <div className='container mx-auto px-4 py-8'>
          {children}
        </div>
    </>
  )
}
