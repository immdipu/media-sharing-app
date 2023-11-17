import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  button: React.ReactNode;
  title?: string;
  description?: string;

  data: React.ReactNode;
  footerData?: React.ReactNode;
}

const index: React.FC<Props> = ({
  button,
  data = "No data",
  description = null,
  footerData = null,
  title = null,
}) => {
  return (
    <Dialog modal>
      <DialogOverlay className="bg-Overlay-background " />
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="bg-Secondary-background border-primary-color border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-Header-primary font-medium tracking-wide">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{data}</div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
          {footerData}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default index;
