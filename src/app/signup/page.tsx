import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { signup } from "../../../actions/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Signup() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 ">
      <div className="h-screen flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form action={signup}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    name="first-name"
                    id="first-name"
                    type={"first-name"}
                    placeholder="Max"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    name="last-name"
                    id="last-name"
                    type={"last-name"}
                    placeholder="Robinson"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  name="username"
                  id="username"
                  type={"email"}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/niduback.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
