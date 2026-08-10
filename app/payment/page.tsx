import Link from "next/link";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-16 text-slate-900">
      <main className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-12">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            Dazzle Football Academy
          </p>
          <h1 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
            Registration Payment
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Thank you for completing the registration. Payment will be completed on the next step once the payment gateway is available.
          </p>
        </header>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
          <p className="text-base font-medium leading-7">
            This page is a placeholder for the payment step. When the payment flow is implemented, you will be able to finalize your registration here.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/review"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            ← Back to Review
          </Link>
          <div className="rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white">
            Payment Coming Soon
          </div>
        </div>
      </main>
    </div>
  );
}
