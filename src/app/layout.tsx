import React from 'react'

export const LayoutApp = ({
  header,
  main
}: {
  header: React.ReactNode
  main: React.ReactNode
}) => {
  return (
    <div className="flex min-h-screen w-full justify-center items-center">
      {header}
      <main className="flex grow justify-center">{main}</main>
    </div>
  )
}
