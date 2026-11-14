import ServicePointForm from "@/components/ServicePointForm";

export default function RegisterServicePoint() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-10">
      <h1 className="text-3xl font-bold">Service Point Registration</h1>
      <p className="mt-2 opacity-70">
        Enter the address and click Find location to get its latitude and longitude.
      </p>
      <ServicePointForm />
    </main>
  );
}
