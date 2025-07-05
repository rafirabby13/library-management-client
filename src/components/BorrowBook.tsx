
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Handshake } from "lucide-react"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useBorrowBookMutation, useGetASingleBookQuery } from "@/redux/api/baseApi"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import { PuffLoader } from "react-spinners"
const borrowBookZodschema = z.object({
   
    quantity: z.coerce.number({
        required_error: 'Copies is required',
        invalid_type_error: 'Copies must be a number',
    }).min(0, { message: 'Copies must be at least 0' }),
    dueDate: z.date({
        required_error: "A date is required.",
    }),
});
type BorrowData = z.infer<typeof borrowBookZodschema>;

const BorrowBook = ({ book }: { book: string }) => {
    const form = useForm<BorrowData>({
        resolver: zodResolver(borrowBookZodschema),
    });
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [borrowBook] = useBorrowBookMutation(undefined)
    const { data, isLoading } = useGetASingleBookQuery(book)
     if (isLoading) {
        return <div className="sweet-loading flex justify-center py-10 ">



            <PuffLoader />
        </div>
    }

    const selectedBook = data?.data
// console.log(selectedBook)


    const onSubmit = async (data: BorrowData) => {





        const borrowData = { book, ...data }
        // console.log(borrowData)
        const res = await borrowBook(borrowData)
        if (res?.error) {
            const err = res.error;
            if ('data' in err) {
                // Safe to access err.data now
                setError((err.data as any)?.message); // or cast to your known error shape
            } else {
                // It's a SerializedError
                setError("Something went wrong");
            }
        }
        if (res?.data?.success) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Book Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/borrowSummary')
        }
        // console.log('object, res', res.data)

    }

    return (
        <div>
            <Dialog >

                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-lib-white text-lib-orange border-2 border-lib-orange font-bold cursor-pointer"><Handshake /></Button>
                </DialogTrigger>
                <DialogContent className="w-full sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Borrow the book {selectedBook?.title}</DialogTitle>
                        {/* <DialogDescription>
                            Fill the form to Borrow a new book in the list
                        </DialogDescription> */}
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Quantity* ( Available: {selectedBook?.copies} )</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Book Quantity" {...field} />

                                        </FormControl>
                                        <FormMessage >{error}</FormMessage>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due date*</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}

                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />





                            <Button className="bg-lib-orange" type="submit">Borrow Book</Button>
                        </form>





                    </Form>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default BorrowBook
