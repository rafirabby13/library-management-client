import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, type SubmitHandler } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"



const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


const AddBooks = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

 
    return (
        <div>

            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-lib-orange text-lib-white cursor-pointer">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add a new book</DialogTitle>
                            <DialogDescription>
                                Fill the form to create a new book in the list
                            </DialogDescription>
                        </DialogHeader>
                   

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="username" {...field} />
                                                </FormControl>
                                            
                                        
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                       

                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default AddBooks
