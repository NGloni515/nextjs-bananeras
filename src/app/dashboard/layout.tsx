import ClientLayoutWrapper from '../../components/ui/ClientLayoutWrapper';

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactNode> {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
