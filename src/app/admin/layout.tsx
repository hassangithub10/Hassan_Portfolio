import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-charcoal text-white font-sans selection:bg-lime/30 selection:text-lime">
            {/* Background Grain/Noise (Optional for texture) */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("/noise.png")' }}></div>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] opacity-10 rounded-full blur-[120px]"
                    style={{
                        background: "radial-gradient(circle, #B0FC51 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] opacity-10 rounded-full blur-[100px]"
                    style={{
                        background: "radial-gradient(circle, #162660 0%, transparent 70%)",
                    }}
                />
            </div>

            <AdminSidebar />

            <div className="md:pl-64 flex flex-col min-h-screen relative z-10 transition-all duration-300">
                <header className="sticky top-0 z-40 flex items-center justify-between h-20 px-6 backdrop-blur-md bg-charcoal/50 border-b border-white/5 md:hidden">
                    {/* Mobile Header content could go here */}
                    <span className="font-heading font-bold text-lg">Admin Panel</span>
                </header>

                <main className="flex-1 p-6 md:p-8 lg:p-12">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
