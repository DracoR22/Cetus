import Link from "next/link"
import Logo from "../Logo"
import { Button } from "../ui/button"

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
           <Logo/>
           <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
             <Button variant="ghost" asChild size="sm">
                <Link href="/sign-in">
                  Login
                </Link>
             </Button>
             <Button variant="cetus" asChild size="sm">
                <Link href="/sign-up">
                  Get Cetus for free
                </Link>
             </Button>
           </div>
        </div>
    </div>
  )
}

export default Navbar