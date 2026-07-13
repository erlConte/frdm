import { PortfolioForm } from "../PortfolioForm";
import { createPortfolioItemAction } from "../actions";

export default function NewPortfolioItemPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Nuova voce portfolio</h2>
      <div className="mt-8">
        <PortfolioForm action={createPortfolioItemAction} />
      </div>
    </div>
  );
}
