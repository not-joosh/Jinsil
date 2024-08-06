import { Link } from "react-router-dom";
import { DefaultFooter } from "../ui/default-footer";
import { SirenIcon } from "../ui/icons";
import { DefaultHeader } from "../ui/default-header";

export const LandingPage = () => {
    return (
        <>
            <div className="flex min-h-[100dvh] flex-col">
                <DefaultHeader />
                <main className="flex-1">
                    <section className="bg-black/90 text-white py-12 sm:py-24 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                            Share Your Certificates with Jinsil
                            </h1>
                            <p className="mt-4 text-lg text-primary-foreground">
                            Jinsil is a free platform that allows you to easily store, manage, and share your certificates online.
                            Keep your credentials safe and accessible from anywhere.
                            </p>
        
                        </div>
                        <div className="flex items-center justify-center">
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="550"
                                alt="Hero"
                                className="bg-white/80 mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
                            />
                        </div>
                        </div>
                    </div>
                    </section>

                    <section className=" !bg-black/10 text-black py-12 sm:py-24 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="flex items-center justify-center">
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="Features"
                                className="bg-white/80 mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Secure Certificate Storage
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                            Jinsil provides a secure and reliable platform to store your certificates. Your data is encrypted and
                            protected, ensuring your credentials are safe and accessible only to you.
                            </p>
                            <div className="mt-8">
                            <Link
                                            
                                className="bg-black text-white inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" to={""}                        
                            >
                                Learn More
                            </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>

                    <section className="bg-background py-12 sm:py-24 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                Easy Certificate Sharing
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                            Jinsil makes it easy to share your certificates with others. Simply select the certificates you want
                            to share and send them a link so they can view your credentials.
                            </p>
                            <div className="mt-8">
                            <Link
                                            
                                className="bg-black text-white inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" to={""}                        
                            >
                                Learn More
                            </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="Features"
                                className="bg-black/10 mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                            />
                        </div>
                        </div>
                    </div>
                    </section>

                </main>
                <DefaultFooter />
             </div>
        </>
      )
};  

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
        <DefaultHeader />
        <main className="flex-1">
            <section className="bg-primary py-12 sm:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                    Share Your Certificates with Jinsil
                    </h1>
                    <p className="mt-4 text-lg text-primary-foreground">
                    Jinsil is a free platform that allows you to easily store, manage, and share your certificates online.
                    Keep your credentials safe and accessible from anywhere.
                    </p>

                </div>
                <div className="flex items-center justify-center">
                    <img
                    src="/placeholder.svg"
                    width="550"
                    height="550"
                    alt="Hero"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
                    />
                </div>
                </div>
            </div>
            </section>
            <section className="bg-muted py-12 sm:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex items-center justify-center">
                    <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="Features"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Secure Certificate Storage
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                    Jinsil provides a secure and reliable platform to store your certificates. Your data is encrypted and
                    protected, ensuring your credentials are safe and accessible only to you.
                    </p>
                    <div className="mt-8">
                    <Link
                        className="bg-black text-white inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" to={""}                        
                    >
                        Learn More
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <section className="bg-background py-12 sm:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Easy Certificate Sharing
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                    Jinsil makes it easy to share your certificates with others. Simply select the certificates you want
                    to share and send them a link so they can view your credentials.
                    </p>
                    <div className="mt-8">
                    <Link
                                      
                        className="bg-black text-white inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" to={""}                        
                    >
                        Learn More
                    </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="Features"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    />
                </div>
                </div>
            </div>
            </section>
        </main>
      <DefaultFooter />
    </div>
  )
}
