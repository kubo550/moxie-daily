import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {DialogProps} from "@radix-ui/react-dialog";

type QuotesModalModalProps = DialogProps

export default function QuotesModal({open, onOpenChange, children}: QuotesModalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {children}
      </DialogContent>
    </Dialog>
  )
}

