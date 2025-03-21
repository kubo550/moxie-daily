import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {DialogProps} from "@radix-ui/react-dialog";

type QuotesModalModalProps = DialogProps

export default function QuotesModal({open, onOpenChange, children}: QuotesModalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] max-h-full overflow-y-auto bg-white/10 rounded-[15px] p-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[15px] backdrop-contrast-90 backdrop-brightness-110 border-0 md:max-w-[800px] md:min-h-[500px]">
        {children}
      </DialogContent>
    </Dialog>
  )
}
