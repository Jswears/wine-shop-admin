export default function WineDetailsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full  w-full flex justify-center flex-col ">
      {children}
    </div>
  );
}
