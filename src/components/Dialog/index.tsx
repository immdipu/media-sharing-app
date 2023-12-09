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
  DialogClose,
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
      <DialogContent className="border border-primary-color bg-Secondary-background sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-medium tracking-wide text-Header-primary">
            {title}
          </DialogTitle>
          <DialogDescription className="text-paragraph-secondary">
            {description}
          </DialogDescription>
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
