import BikerForm from "@/components/BikerForm";

export default function RegisterBiker() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-10">
      <h1 className="text-3xl font-bold">Biker Registration</h1>
      <p className="mt-2 opacity-70">Fill in your details to join as a biker.</p>
      <BikerForm />
    </main>
  );
}
