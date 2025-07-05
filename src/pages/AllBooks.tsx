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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddBooks from "./AddBooks";
import EditBook from "@/components/EditBook";
import Swal from 'sweetalert2'
import BorrowBook from "@/components/BorrowBook";
import {
    Pagination,
    PaginationContent,
   
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";
const AllBooks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 7;
    const { data, isLoading, isError } = useGetBooksQuery({ page: currentPage, limit })
    const [deleteBook] = useDeleteBookMutation(undefined)
    if (isLoading) {
        return <div className="sweet-loading flex justify-center ">



            <PuffLoader />
        </div>
    }
    if (isError) {
        console.log('error')
    }

    const books = data?.data
    const totalPages = data?.totalPages || 1;

    // console.log(books)

    const handleDeleteABook = (bookId: string) => {
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
                <p className="text-3xl font-bold border-b-4 text-lib-orange border-lib-background">Books: {books?.length}</p>
                <AddBooks />
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow className="bg-lib-background text-lib-orange">
                        <TableHead className="">No.</TableHead>
                        <TableHead className="">Title</TableHead>
                        <TableHead className="">Author</TableHead>
                        <TableHead className="">ISBN</TableHead>
                        <TableHead >Genre</TableHead>
                        <TableHead>Copies</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        books?.map((book: any, i: number) =>
                            <TableRow key={book.isbn}>
                                <TableCell className="font-medium">{((currentPage - 1) * limit) + i + 1}</TableCell>
                                <TableCell className="font-medium">{book.title}</TableCell>
                                <TableCell className="font-medium">{book.author}</TableCell>
                                <TableCell className="font-medium">{book.isbn}</TableCell>
                                <TableCell className="font-medium">{book.genre}</TableCell>
                                <TableCell className="font-medium">{book.copies}</TableCell>
                                <TableCell className="font-medium">{book.available ? "available" : "Not Available"}</TableCell>
                                <TableCell className="flex items-center gap-4 justify-center">

                                    <EditBook bookId={book?._id} />
                                    <Button onClick={() => handleDeleteABook(book?._id)} className="bg-lib-orange"><Trash2 /></Button>
                                    <BorrowBook book={book?._id} />
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
            <Pagination className="pt-10">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="cursor-pointer bg-lib-background  text-lib-orange"
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink className="border-2 bg-lib-orange text-lib-white" href="#">{currentPage}</PaginationLink>
                    </PaginationItem>


                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="cursor-pointer bg-lib-background  text-lib-orange"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default AllBooks
