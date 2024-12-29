import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClaimHistory, PendingClaims } from '@/components/Claims'

const page = () => {
  return (
    <div className='p-2'>
      <div className='mb-4 text-foreground/80'>
        <h1 className='text-4xl font-bold pl-1'>Your Claims</h1>
        <p className='text-foreground/60 pl-2'>
          View your pending claims and claim history
        </p>
      </div>
      <div className='p-2 '>
        <Tabs defaultValue='pending-claims' className='w-full'>
          <TabsList>
            <TabsTrigger value='pending-claims'>Pending Claims</TabsTrigger>
            <TabsTrigger value='claim-history'>Claim History</TabsTrigger>
          </TabsList>
          <TabsContent value='pending-claims'>
            <PendingClaims />
          </TabsContent>
          <TabsContent value='claim-history'>
            <ClaimHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
