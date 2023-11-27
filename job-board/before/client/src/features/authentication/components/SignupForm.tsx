import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from '@backend/constants/schemas/users'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type SignupValues = z.infer<typeof formSchema>

const formSchema = signupSchema.merge(z.object({ passwordConfirmation: z.string() })).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
})

export function SignupForm() {
    const form = useForm<SignupValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    function onSubmit(){
        //
    }

    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                {/* TODO Error Message */}
            </CardHeader>
            <CardContent className="flex flex-col w-full gap-4">

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password Confirmation</FormLabel>
                    <FormControl>
                    <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
                <Button type="button" asChild variant="ghost">
                    <Link to='/'>Cancel</Link>
                </Button>
                <Button type="button" asChild variant="outline">
                    <Link to='/login'>Login</Link>
                </Button>
                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? <LoadingSpinner /> : "Sign Up"}
                </Button>
            </CardFooter>
        </Card>

            </form>
          </Form>
    )
}
