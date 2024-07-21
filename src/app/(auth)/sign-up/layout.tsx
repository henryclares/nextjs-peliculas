// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';

// import { BaseTemplate } from "@/templates/BaseTemplate";

export default function Layout(props: { children: React.ReactNode }) {
  // const { userId } = auth();

  // if (userId) {
  //   redirect('/dashboard');
  // }
  return (
    <div className="w-full text-gray-300 antialiased">
      <div className="mx-auto max-w-screen-md">
        <main>
          <div className="flex flex-col items-center justify-center h-min p-4 gap-6">
            <div className="flex min-h-full flex-1 flex-col justify-center py-12">
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
