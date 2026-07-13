import { ShopForm } from "../ShopForm";
import { createShopListingAction } from "../actions";

export default function NewShopListingPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Nuovo annuncio</h2>
      <div className="mt-8">
        <ShopForm action={createShopListingAction} />
      </div>
    </div>
  );
}
