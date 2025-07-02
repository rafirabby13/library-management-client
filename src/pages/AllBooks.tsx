import { useGetBooksQuery } from "@/redux/api/baseApi"
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
const AllBooks = () => {


    const { data, isLoading, isError } = useGetBooksQuery(undefined)
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

    return (
        <div>
            <div className="flex items-center justify-between pb-10">
                <p className="text-3xl font-bold border-b-4 text-lib-orange border-lib-background">Books</p>
                <AddBooks/>
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
                                    <Button className="bg-lib-blue"><Edit2/></Button>
                                    <Button className="bg-lib-orange"><Trash2/></Button>
                                    <Button className="bg-green-900"><Handshake /></Button>
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
