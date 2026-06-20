export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold">
              ShopNow
            </h2>

            <p className="mt-3 text-muted-foreground">
              Modern ecommerce experience built with
              Next.js.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">
              Shop
            </h4>

            <ul className="space-y-2 text-muted-foreground">
              <li>Products</li>
              <li>Categories</li>
              <li>Deals</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">
              Company
            </h4>

            <ul className="space-y-2 text-muted-foreground">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">
              Legal
            </h4>

            <ul className="space-y-2 text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          © 2026 ShopNow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}