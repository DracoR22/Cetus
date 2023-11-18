import Logo from "../Logo"
import { Button } from "../ui/button"

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 bg-white ">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
           <Logo/>
           <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
             <Button variant="ghost" size="sm">
                  Privacy Policy
             </Button>
             <Button variant="ghost" size="sm">
                  Terms of Service
             </Button>
           </div>
        </div>
    </div>
  )
}

export default Footer