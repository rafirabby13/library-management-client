import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select, SelectContent,
  
    SelectItem,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAddBookMutation } from "@/redux/api/baseApi"

import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import { useState } from "react"

const schema = z.object({
    title: z.string({ required_error: "Title is required" }).min(1, "Title cannot be empty"),
    author: z.string({ required_error: "Author is required" }).min(1, "Author cannot be empty"),
    genre: z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: z.string({ required_error: "ISBN is required" }),
    description: z.string().optional(),
    copies: z.coerce.number({
        required_error: 'Copies is required',
        invalid_type_error: 'Copies must be a number',
    }).min(0, { message: 'Copies must be at least 0' }),
    available: z
        .boolean()
        .optional()

});

type FormData = z.infer<typeof schema>;


const AddBooks = () => {
    const [open, setOpen] = useState(false)
    const [addBook] = useAddBookMutation(undefined)

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate()

    const onSubmit = async (data: FormData) => {


        try {
            if (!data.description) {
                data.description = ''
            }
            console.log(data)
            const res = await addBook(data)
            console.log('object, res', res)
            if (res?.data?.success) {
                setOpen(false)
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
                    title: "Book Created Successfully"

                });

                navigate('/allBooks')
            }

        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.message}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }

    }


    return (
        <div >

            <Dialog open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        form.reset() // optional
                    }
                    setOpen(isOpen)
                }}>

                <DialogTrigger >
                    <Button onClick={() => setOpen(true)} variant="outline" className="bg-lib-orange text-lib-white cursor-pointer">Add A Book</Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Add a new book</DialogTitle>
                        <DialogDescription>
                            Fill the form to create a new book in the list
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
                                            <Input placeholder="Book Title" {...field} />

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
                                            <Input placeholder="Author" {...field} />


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
                                            <Input placeholder="ISBN Number" {...field} />

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
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
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
                                            <Input placeholder="Number of Copies" {...field} />

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
                                        <FormLabel>Available (true / false)</FormLabel>
                                        <Select

                                            onValueChange={(value) => field.onChange(value === 'true')}

                                            defaultValue={field.value !== undefined ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
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




                            <Button className="bg-lib-orange" type="submit">Add Book</Button>
                        </form>





                    </Form>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default AddBooks
