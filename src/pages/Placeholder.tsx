import { AppLayout } from '@/components/AppLayout';
import { Link, useLocation } from 'react-router-dom';

const Placeholder = () => {
  const { pathname } = useLocation();
  return (
    <AppLayout>
      <div className="space-y-4 p-6">
        <h1 className="text-xl font-semibold">Module scaffold</h1>
        <p className="text-sm text-muted-foreground">
          Route <code>{pathname}</code> is reserved for further development. The dashboard and master register already run against demo data.
        </p>
        <Link className="text-sm underline" to="/">Back to dashboard</Link>
      </div>
    </AppLayout>
  );
};

export default Placeholder;
