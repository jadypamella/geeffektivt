import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-warm">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <img src={logo} alt="GiveWise" className="h-8 w-auto" width={120} height={32} />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Evidence-based giving. We channel your generosity to charities proven to save and improve lives.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/impact" className="hover:text-foreground">Impact</Link></li>
            <li><Link to="/charities" className="hover:text-foreground">Charities</Link></li>
            <li><Link to="/stories" className="hover:text-foreground">Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Trust</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About us</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><a href="#" className="hover:text-foreground">Transparency report</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>GeEffektivt</li>
            <li>info@geeffektivt.se</li>
            <li>+46 760 22 83 74</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} GiveWise. A demo experience.</span>
          <span>Built with care, for impact.</span>
        </div>
      </div>
    </footer>
  );
}
