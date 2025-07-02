import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PuffLoader } from "react-spinners";
import { Edit2, Handshake, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddBooks from "./AddBooks";
import EditBook from "@/components/EditBook";
import Swal from 'sweetalert2'
import BorrowBook from "@/components/BorrowBook";
const AllBooks = () => {


    const { data, isLoading, isError } = useGetBooksQuery(undefined)
    const [deleteBook] = useDeleteBookMutation(undefined)
    if (isLoading) {
        return <div className="sweet-loading">



            <PuffLoader />
        </div>
    }
    if (isError) {
        console.log('error')
    }

    const books = data?.data
    // console.log(books)

const handleDeleteABook=(bookId)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
     deleteBook(bookId)
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
   

}
   

    return (
        <div>
            <div className="flex items-center justify-between pb-10">
                <p className="text-3xl font-bold border-b-4 text-lib-orange border-lib-background">Books: {books.length}</p>
                <AddBooks />
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow className="bg-lib-background text-lib-orange">
                        <TableHead className="">Title</TableHead>
                        <TableHead className="">Author</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Copies</TableHead>
                        <TableHead >Genre</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        books?.map((book: any) =>
                            <TableRow key={book.isbn}>
                                <TableCell className="font-medium">{book.title}</TableCell>
                                <TableCell className="font-medium">{book.author}</TableCell>
                                <TableCell>{book.available ? "available" : "Not Available"}</TableCell>
                                <TableCell>{book.copies}</TableCell>
                                <TableCell >{book.genre}</TableCell>
                                <TableCell className="flex items-center gap-4 justify-center">
                                    
                                    <EditBook bookId={book._id} />
                                    <Button onClick={()=>handleDeleteABook(book._id)} className="bg-lib-orange"><Trash2 /></Button>
                                    <BorrowBook book={book._id}/>
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AllBooks
