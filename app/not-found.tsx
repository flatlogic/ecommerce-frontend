import Link from "components/compat/Link";

export default function NotFound() {
  return (
    <main className="container py-5 text-center">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
      <Link href="/" className="btn btn-primary">
        Return home
      </Link>
    </main>
  );
}
