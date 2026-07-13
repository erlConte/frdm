import { notFound } from "next/navigation";
import { getShopListingByIdAdmin } from "@/lib/data/shop";
import { ShopForm } from "../ShopForm";
import { updateShopListingAction } from "../actions";

export default async function EditShopListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getShopListingByIdAdmin(id);

  if (!listing) notFound();

  const action = updateShopListingAction.bind(null, id);

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Modifica annuncio</h2>
      <div className="mt-8">
        <ShopForm listing={listing} action={action} />
      </div>
    </div>
  );
}
