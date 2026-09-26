import type { ReactNode } from "react";
import { careCopy, conceptNote } from "@/lib/copy";
import type { Category } from "@/lib/types";

function Item({
  title,
  children,
  open = false,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details open={open} className="border-b border-ink/10">
      <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[0.98rem]">
        {title}
        <span className="plus" aria-hidden="true" />
      </summary>
      <div className="pb-6 text-sm leading-relaxed">{children}</div>
    </details>
  );
}

export function DetailsAccordion({
  details,
  category,
}: {
  details: string[];
  category: Category;
}) {
  return (
    <div className="mt-10 border-t border-ink/10">
      <Item title="Details" open>
        <ul className="space-y-2">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </Item>
      <Item title="Care">{careCopy[category]}</Item>
      <Item title="About this store">
        <p>
          {conceptNote} The bag is saved in this browser. Checkout is not open.
        </p>
      </Item>
    </div>
  );
}
