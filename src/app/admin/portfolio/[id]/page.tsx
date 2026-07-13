import { notFound } from "next/navigation";
import { getPortfolioItemByIdAdmin } from "@/lib/data/portfolio";
import { PortfolioForm } from "../PortfolioForm";
import { updatePortfolioItemAction } from "../actions";

export default async function EditPortfolioItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPortfolioItemByIdAdmin(id);

  if (!item) notFound();

  const action = updatePortfolioItemAction.bind(null, id);

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Modifica voce portfolio</h2>
      <div className="mt-8">
        <PortfolioForm item={item} action={action} />
      </div>
    </div>
  );
}
