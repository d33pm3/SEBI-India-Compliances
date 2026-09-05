import { AppLayout } from '@/components/AppLayout';
import { Link, useLocation } from 'react-router-dom';

const Placeholder = () => {
  const { pathname } = useLocation();
  return (
    <AppLayout title="Module scaffold" subtitle={pathname}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This route is reserved for further development. The dashboard already runs against demo register data.
        </p>
        <Link className="text-sm underline" to="/">Back to dashboard</Link>
      </div>
    </AppLayout>
  );
};

export default Placeholder;
