'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from '@/schema/authSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { authApi } from '@/api/authApi';
import { Loader } from 'lucide-react';
import { AxiosError } from 'axios';
import { useActiveSidebar } from '@/hooks/use-active-sidebar';
import { useRouter } from 'next/navigation';

type LoginForm = z.infer<typeof loginSchema>;

export default function AuthForm() {
  const { setActiveSidebar } = useActiveSidebar();
  const router = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      role: 'ADMIN',
    },
  });

  const storeMutation = useMutation({
    mutationFn: (credentials: LoginForm) => authApi.login(credentials),
    onSuccess: (data) => {
      console.log('Login successful, redirecting to /dashboard', data); // Debug log
      toast.success('Welcome');
      setActiveSidebar('dashboard');
      router.push('/dashboard'); // Redirect to /dashboard
    },
    onError: (error: AxiosError<{ errors: Record<string, string[]>; message: string }>) => {
      console.log('Login error:', error.response?.data); // Debug log
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      if (error.response?.data?.errors) {
        const { errors } = error.response.data;
        if (errors.username) {
          form.setError('username', {
            type: 'manual',
            message: errors.username.join(', '),
          });
        }
        if (errors.password) {
          form.setError('password', {
            type: 'manual',
            message: errors.password.join(', '),
          });
        }
      }
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log('Submitting login form:', data); // Debug log
    storeMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        className="p-6 md:p-8"
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-2">
              <h1 className="text-2xl font-bold">Walbase Admin</h1>
            </div>
            <p className="text-balance text-muted-foreground">Login to your admin account</p>
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="password" placeholder="Password here ..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Role</FormLabel> */}
                  <FormMessage />
                  <FormControl>
                    <Input type='hidden' placeholder="ADMIN" {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={storeMutation.isPending}>
            {storeMutation.isPending ? (
              <>
                <Loader className="animate-spin me-2" /> <span>Logging In ...</span>
              </>
            ) : (
              <>Login</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}