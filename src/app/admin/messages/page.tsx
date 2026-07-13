import { getContactMessagesAdmin } from "@/lib/data/contact";
import { DeleteButton } from "../DeleteButton";
import { AdminError, errorMessage } from "../AdminError";
import { deleteContactMessageAction } from "./actions";

export default async function AdminMessagesPage() {
  let messages;
  try {
    messages = await getContactMessagesAdmin();
  } catch (error) {
    return <AdminError message={errorMessage(error)} />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">Messaggi di contatto</h2>

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{message.name}</p>
                <a
                  href={`mailto:${message.email}`}
                  className="text-sm text-accent-2 hover:underline"
                >
                  {message.email}
                </a>
                <p className="mt-1 text-xs text-muted">
                  {new Date(message.created_at).toLocaleString("it-IT")}
                </p>
              </div>
              <DeleteButton
                action={deleteContactMessageAction.bind(null, message.id)}
                confirmMessage="Eliminare questo messaggio?"
              />
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{message.message}</p>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="text-sm text-muted">Nessun messaggio ricevuto finora.</p>
        )}
      </div>
    </div>
  );
}
