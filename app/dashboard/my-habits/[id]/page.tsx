'use client'

const page = ({ params }: any) => {
  const { id } = params
  return <div>{id}</div>
}

export default page
