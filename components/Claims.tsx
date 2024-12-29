import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export const PendingClaims = () => {
  return (
    <div className=''>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold '>Habit Title</TableHead>
            <TableHead className='font-semibold '>Raised Date</TableHead>
            <TableHead className='font-semibold '>Status</TableHead>
            <TableHead className='font-semibold text-end'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export const ClaimHistory = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold '>Habit Title</TableHead>
            <TableHead className='font-semibold '>Raised Date</TableHead>
            <TableHead className='font-semibold '>Settled Date</TableHead>
            <TableHead className='font-semibold '>Status</TableHead>
            <TableHead className='font-semibold text-end'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Failed</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Java 25</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>29-12-2024</TableCell>
            <TableCell>Success</TableCell>
            <TableCell className='text-right'>0.0000001 ETH </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
