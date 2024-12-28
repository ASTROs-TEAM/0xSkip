import React from 'react'
import { Explorehabits } from "@/components/Explorehabits";


const page = () => {
  return (
    <section>
            {/* this is for sidebar */}
        <div>

        </div>

        {/* this is for main content */}
        <div>
            {/* <Explorehabits /> */}
            <Explorehabits variant="default" size="default" className="my-4" />
        </div>

        {/* this is for calendar */}
        <div>

        </div>
    </section>
  )
}

export default page