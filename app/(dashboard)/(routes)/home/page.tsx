import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stars, Users, ArrowLeftRight, ArrowRight } from "lucide-react";
import { formatter } from "@/lib/utils";
import { getItems } from "@/data/item";
import { getProjects } from "@/data/project";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Overview } from "@/components/common/overview";
export default async function HomePage() {
  const projects = await getProjects();
  const members = await getItems("member");

  return (
    <>
      <Heading title="Dashboard" description="Overview of your projects." />
      <Separator />

      <div className="grid gap-4 grid-cols-1  md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-md font-medium p-0">
                Projects
              </CardTitle>
              <Stars className="h-4 w-4 mr-2 text-muted-foreground" />
            </div>
            <CardDescription>Total count projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {projects?.length} Project
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="link" size="sm" asChild>
              <Link href="/projects">
                Explore <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-md font-medium p-0">Members</CardTitle>
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            </div>
            <CardDescription>Our team in microtech</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {members?.length} Member
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="link" size="sm" asChild>
              <Link href="/members">
                Explore <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div>here will found best projects</div>
    </>
  );
}
