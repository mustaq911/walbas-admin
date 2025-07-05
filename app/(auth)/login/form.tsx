"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/schema/authSchema";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useMutation } from '@tanstack/react-query';
import { Form,  FormControl, FormField, FormItem, FormLabel,FormMessage} from "@/components/ui/form"
import { toast } from "sonner";
import { authApi } from "@/api/authApi";
import { Grid2X2, Loader} from "lucide-react";
import { AxiosError } from "axios";
import { StoreToken } from "@/services/handlers/TokenHandler";
import { useActiveSidebar } from "@/hooks/use-active-sidebar";
import Image from "next/image";
import ImageSrc from "@/constants/image";

type LoginForm = z.infer<typeof loginSchema>; 

export default function AuthForm(){
    
    const {setActiveSidebar}  = useActiveSidebar();
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: { 
            email: "", password: "" 
        },
    });

    // const onSubmit = (data: LoginForm) => {
        const onSubmit = () => {
        // storeMutation.mutate(data);
          window.location.href = "/dashboard";
    };

    const storeMutation = useMutation({
        mutationFn: (credentials: LoginForm) => authApi.login(credentials),
        onSuccess: (data) => { 
            toast.success("Welcome");
            StoreToken(data.data.data.access_token);
            setActiveSidebar("dashboard");
            window.location.href = "/dashboard";
        },
        onError: (error: AxiosError<{ errors: Record<string, string[]>; message: string }>) => {
            if (error.response) {
                const { errors, message } = error.response.data;
                toast.error(message);
                if (errors?.email) {
                    form.setError('email', {
                        type: 'manual',
                        message: errors.email.join(', '), 
                    });
                }
                if (errors?.password) {
                    form.setError('password', {
                        type: 'manual',
                        message: errors.password.join(', '),
                    });
                }
            }
        },
    });

    return (
        <Form {...form}>  
            <form className="p-6 md:p-8"
                onSubmit={form.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                        e.preventDefault(); 
                        form.handleSubmit(onSubmit)(); 
                    }
                }}
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-2">
                            {/* <Image width={25} height={25} alt="logo" src={ImageSrc.logo}></Image> */}
                            <h1 className="text-2xl font-bold">Walbase Admin</h1>
                        </div>
                        <p className="text-balance text-muted-foreground">
                        Login to your admin account
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Email</FormLabel>
                                    <FormMessage />
                                    <FormControl>
                                        <Input
                                            placeholder="john.doe@example.com" 
                                            {...field} 
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Password</FormLabel>
                                    <FormMessage />
                                    <FormControl>
                                        <Input type="password" placeholder="Password here ..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full"
                        disabled={storeMutation.isPending}>
                            {storeMutation.isPending ? (
                            <><Loader className='animate-spin me-2' /> <span>Logging In ...</span></>
                            ): (
                            <>Login</>
                            )}
                    </Button>
                    {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                        </span>
                    </div>
                    <div className="">
                        <Button variant="outline" className="w-full">
                            <Grid2X2/> Microsoft Account
                        </Button>
                    </div>
                    <div className="text-center text-sm flex justify-center">
                            <Image src={ImageSrc.logomarks} alt="logomarks" width={100} height={100}/>
                    </div> */}
                </div>
            </form>
        </Form>
    )
}