import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imgUrl } from "@/lib/images";

export const Lightbox = ({ items, index, onClose, onChange }) => {
  const lenis = useLenis();
  const dialog = useRef(null);
  const touchX = useRef(null);
  const open = index !== null && index >= 0 && index < items.length;
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    dialog.current?.querySelector('button')?.focus();
    return () => { document.body.style.overflow = oldOverflow; lenis?.start(); previous?.focus?.(); };
  }, [open,lenis]);
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "ArrowRight") { e.preventDefault(); onChange((index+1)%items.length); }
      if (e.key === "ArrowLeft") { e.preventDefault(); onChange((index-1+items.length)%items.length); }
      if (e.key === "Tab") {
        const controls = [...dialog.current.querySelectorAll('button')];
        const first=controls[0],last=controls[controls.length-1];
        if (e.shiftKey && document.activeElement===first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement===last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  }, [open,index,items.length,onClose,onChange]);
  if (!open) return null;
  const item=items[index], go=direction=>onChange((index+direction+items.length)%items.length);
  return createPortal(<div ref={dialog} role="dialog" aria-modal="true" aria-label="Image viewer" data-testid="lightbox" className="fixed inset-0 z-[100] flex flex-col bg-oxblood-deep text-white" onTouchStart={e=>touchX.current=e.touches[0].clientX} onTouchEnd={e=>{if(touchX.current!==null){const dx=e.changedTouches[0].clientX-touchX.current;if(Math.abs(dx)>50)go(dx<0?1:-1);touchX.current=null;}}}>
    <div className="flex h-16 shrink-0 items-center justify-between px-6"><p className="text-xs" data-testid="lightbox-counter">{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</p><button type="button" onClick={onClose} data-testid="lightbox-close" aria-label="Close image viewer" className="flex h-11 w-11 items-center justify-center"><X className="h-5 w-5" /></button></div>
    <div className="lightbox-stage"><img src={imgUrl(item,1920)} alt={item.alt||""} data-testid="lightbox-image" /><button type="button" onClick={()=>go(-1)} data-testid="lightbox-prev" aria-label="Previous image" className="absolute left-1 top-1/2 flex h-11 w-11 items-center justify-center"><ChevronLeft className="h-5 w-5" /></button><button type="button" onClick={()=>go(1)} data-testid="lightbox-next" aria-label="Next image" className="absolute right-1 top-1/2 flex h-11 w-11 items-center justify-center"><ChevronRight className="h-5 w-5" /></button></div>
    <p className="shrink-0 px-6 py-5 text-center text-xs text-white/75" data-testid="lightbox-caption">{item.alt}</p>
  </div>,document.body);
};