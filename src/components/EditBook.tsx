import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"



import {
    Select, SelectContent,

    SelectItem,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {  useGetBooksQuery, useUpdateBookMutation } from "@/redux/api/baseApi"

import { Edit2 } from "lucide-react"
import { PuffLoader } from "react-spinners"
import { useState } from "react"
import Swal from "sweetalert2"

import type { IBookResponse } from "@/types/booksType"

// const schema = z.object({
//     title: z.string({ required_error: "Title is required" }).min(1, "Title cannot be empty"),
//     author: z.string({ required_error: "Author is required" }).min(1, "Author cannot be empty"),
//     genre: z.enum([
//         "FICTION",
//         "NON_FICTION",
//         "SCIENCE",
//         "HISTORY",
//         "BIOGRAPHY",
//         "FANTASY",
//     ]),
//     isbn: z.string({ required_error: "ISBN is required" }),
//     description: z.string().optional(),
//     copies: z.coerce.number({
//         required_error: 'Copies is required',
//         invalid_type_error: 'Copies must be a number',
//     }).min(0, { message: 'Copies must be at least 0' }),
//     available: z
//         .boolean()
//         .optional()

// });

// type FormData = z.infer<typeof schema>;
const EditBook = ({ bookId }: {bookId: string}) => {
    const [open, setOpen] = useState(false)
    const form = useForm();
    const { data, isLoading, isError } = useGetBooksQuery(undefined)
    const [updateBook] = useUpdateBookMutation(undefined)
    if (isLoading) {
        return <div className="sweet-loading">



            <PuffLoader />
        </div>
    }
    if (isError) {
        console.log('error',isError)
    }

    const book = data?.data?.find((book: IBookResponse) => book._id === bookId)

    // console.log(book)





    const onSubmit = async (data: any) => {

        const title = data.title ? data.title : book.title
        const author = data.author ? data.author : book.author
        const isbn = data.isbn ? data.isbn : book.isbn
        const description = data.description ? data.description : book.description
        const genre = data.genre ? data.genre : book.genre
        const copies = data.copies ? data.copies : book.copies
        const available = data.available === undefined ? book.available : data.available



        const updatedBookData = { title, author, isbn, genre, description, copies, available }

        const res = await updateBook({ bookId, updatedBookData })
        

        if (res?.data?.success) {
            if (res?.data?.success) {
                setOpen(false);
                form.reset();
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "The book has been created successfully!"
                });

             
            }


        }



        console.log(res)

    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-lib-blue text-lib-white cursor-pointer"><Edit2 /></Button>
                </DialogTrigger>
                <DialogContent className="w-full sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit The Book - {book?.title}</DialogTitle>
                        <DialogDescription>
                            Fill the form to Update the book in the list
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="title">Book Title*</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={book?.title} placeholder="Book Title" {...field} />

                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Author*</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={book?.author} placeholder="Author" {...field} />


                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >ISBN Number*</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={book?.isbn} placeholder="ISBN Number" {...field} />

                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre*</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={book?.genre}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a Genre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent  >
                                                <SelectItem value="FICTION">Fiction</SelectItem>
                                                <SelectItem value="NON_FICTION">Non Fiction</SelectItem>
                                                <SelectItem value="SCIENCE">Science</SelectItem>
                                                <SelectItem value="HISTORY">History</SelectItem>
                                                <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                                <SelectItem value="FANTASY">Fantasy</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                defaultValue={book?.description}
                                                placeholder="Books Description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="copies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Number of Copies*</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={book?.copies} placeholder="Number of Copies" {...field} />

                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="available" // Your form field name
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Available ( true / false )</FormLabel>
                                        <Select

                                            onValueChange={(value) => field.onChange(value === 'true')}


                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select availability" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="true">Yes</SelectItem>
                                                <SelectItem value="false">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




                            <Button className="bg-lib-orange" type="submit">Edit The Book</Button>
                        </form>





                    </Form>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default EditBook
