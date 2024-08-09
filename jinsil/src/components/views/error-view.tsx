import { HOME } from "@/lib/routes";
import { Link } from "react-router-dom";
import { error_img } from "@/assets/assets";
import { GradientSwipeBlob } from "../ui/motion/GradientSwipBlob";
export const ErrorPage = () => {
    return (
        <>
            <GradientSwipeBlob />
            <div className="flex h-[100dvh] items-center">
                <div className="container grid grid-cols-1 gap-8 md:grid-cols-2">
                    <img
                        src={error_img}
                        width="800"
                        height="600"
                        alt="404 Error"
                        className="h-full w-full rounded-lg object-cover"
                        style={{ aspectRatio: "800/600", objectFit: "cover" }}
                    />
                    <div className="flex flex-col items-start justify-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Oops, page not found. haha</h1>
                        <p className="text-muted-foreground md:text-xl">
                        The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                    <Link
                        to={HOME}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Go back home
                    </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
