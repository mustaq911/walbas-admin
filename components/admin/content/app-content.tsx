

interface AppContentProps {
    title?: string | null;
    children: React.ReactNode;
}
  
export default function AppContent({title, children}: AppContentProps) {
      return (
        <div className="text-sm">
            <div className="text-lg font-bold mb-2">{title}</div>
            {children}
        </div>
      )
  }
  