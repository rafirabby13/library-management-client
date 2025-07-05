import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useBorrowSummaryQuery } from "@/redux/api/baseApi"
import { PuffLoader } from "react-spinners"

const BorrowSummary = () => {
  const { data, isError, isLoading } = useBorrowSummaryQuery(undefined)
  if (isLoading) {
    return <div className="sweet-loading  flex justify-center py-10">



      <PuffLoader />
    </div>
  }
  if (isError) {
    console.log('error')
  }

  const borrowSummary = data?.data

  return (
    <div>
      <div>
        <div className="flex items-center justify-between pb-10">
          <p className="text-3xl font-bold border-b-4 text-lib-orange border-lib-background">Books: {borrowSummary?.length}</p>

        </div>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow className="bg-lib-background text-lib-orange">
              <TableHead className="">No</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead className="">ISBN</TableHead>
              <TableHead>Total Quantity</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {
              borrowSummary?.map((book: any, i: number) =>
                <TableRow key={book.isbn}>
                  <TableCell className="font-medium">{i+1}</TableCell>
                  <TableCell className="font-medium">{book.book.title}</TableCell>
                  <TableCell className="font-medium">{book.book.isbn}</TableCell>
                  <TableCell className="font-medium">{book.totalQuantity}</TableCell>

                </TableRow>
              )
            }

          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default BorrowSummary
